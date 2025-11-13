# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MK Pay Frontend is a Vue 3 + TypeScript + Tailwind CSS web application that provides a dashboard and management interface for payment processing. The application features multi-account support where users can switch between different accounts.

## Development Commands

### Installation & Setup

```bash
npm install
# Setup environment variables in .env (copy from .env.example)
```

### Running the Application

```bash
npm run dev  # Run dev server with hot reload (localhost:5173)
npm run build  # Build for production
npm run preview  # Preview production build locally
```

## Code Architecture

### Global Account Selection System

The application implements a global account selection system that ensures no resources are displayed without an active account selection.

#### Key Components & Files

1. **Account Store** (`src/stores/accounts.store.ts`)
   - Pinia store managing account state globally
   - Persists selected account UUID to localStorage
   - Auto-selects first account if none selected
   - Provides `currentAccountUuid` computed property for API calls

2. **Account Selector Component** (`src/components/shared/AccountSelector.vue`)
   - Dropdown select element displayed at top of authenticated pages
   - Allows users to switch between their accounts
   - Only shows when accounts are available

3. **Auth Layout** (`src/layouts/AuthLayout.vue`)
   - Wraps all routes (in `App.vue`)
   - Shows empty state "Nenhuma conta selecionada" when no account selected
   - Only activates for authenticated route names in `AUTHENTICATED_ROUTES` array
   - Prevents displaying content without an active account

#### Implementation Flow

1. User logs in → `AuthLayout` detects authenticated route
2. `fetchAccounts()` loads user's accounts from `/api/v1/accounts`
3. First account auto-selected (or restores from localStorage)
4. `AccountSelector` displays available accounts
5. Changing selection updates `accountsStore.selectedAccount`
6. All API calls receive `account_uuid` parameter automatically

### API Integration Pattern

Services use the global account context to pass `account_uuid` to API endpoints:

```typescript
// Example: apps.service.ts
async getApps(): Promise<App[]> {
    const accountUuid = this.getAccountUuid(); // Throws if none selected
    const response = await api.get<ApiResponse<PaginatedResponse<App>>>('/api/v1/apps', {
        params: { account_uuid: accountUuid },
    });
    return response.data.data.data;
}
```

### Directory Structure

```
src/
├── components/
│   ├── shared/           # Shared UI components (AccountSelector, Modal, etc)
│   ├── dashboard/        # Dashboard-specific components
│   └── apps/             # App management components
├── composables/          # Vue composables (useApps, useAuth, etc)
├── layouts/              # Layout wrappers (AuthLayout)
├── services/             # API service classes (accounts.service, apps.service, etc)
├── stores/               # Pinia stores (accounts.store, apps.store, auth.store)
├── types/                # TypeScript interfaces (Account, User, App, etc)
├── views/                # Page components (routes)
├── router/               # Vue Router configuration
└── App.vue               # Root component wrapped with AuthLayout
```

### Important Patterns

#### Watch for Account Changes

Views that display account-specific data should watch for account changes and reload:

```typescript
const accountsStore = useAccountsStore();

watch(
    () => accountsStore.currentAccount,
    () => {
        loadData(); // Reload data when account changes
    }
);
```

#### API Response Structure

All API responses follow this structure:

```typescript
interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}
```

Paginated responses nest data:

```typescript
interface ApiResponse<PaginatedResponse<App>> {
    success: boolean;
    data: {
        data: App[];
        meta: { current_page, last_page, per_page, total }
    }
}
```

## Backend API Reference

Base URL: `http://localhost:8000/api/v1`

### Authenticated Routes

All authenticated endpoints require `Authorization: Bearer {token}` header.

#### Accounts

- `GET /accounts` - List user's accounts
- `GET /account/{uuid}` - Get specific account details
- `PUT /account` - Update authenticated account (with account context from request middleware)

#### Apps

- `GET /apps` - List apps (requires `account_uuid` query parameter)
- `POST /apps` - Create app (requires `account_uuid` in body)
- `GET /apps/{appId}` - Get app details
- `PUT /apps/{appId}` - Update app
- `DELETE /apps/{appId}` - Delete app
- `POST /apps/{appId}/activate` - Activate app
- `POST /apps/{appId}/deactivate` - Deactivate app
- `GET /apps/{appId}/tokens` - List app tokens
- `POST /apps/{appId}/tokens` - Create token
- `PUT /apps/{appId}/tokens/{tokenId}` - Update token
- `DELETE /apps/{appId}/tokens/{tokenId}` - Revoke token

## Type System

### Core Types Location: `src/types/`

- **auth.types.ts**: `User`, `Account`, `LoginCredentials`, `AuthResponse`
- **app.types.ts**: `App`, `AppStats`, `CreateAppDTO`, `UpdateAppDTO`
- **api.types.ts**: `ApiResponse`, `ApiError`, `PaginatedResponse`
- **dashboard.types.ts**: `DashboardStats`, `RecentSale`

### Account Interface

```typescript
interface Account {
    id: string;
    uuid: string;          // Used in API queries
    name: string;
    document?: string;
    status: 'active' | 'inactive' | 'suspended';
    created_at: string;
    updated_at: string;
}
```

## Environment Variables

```
VITE_API_BASE_URL=http://localhost:8000
```

Configure in `.env` file for development.

## Common Development Tasks

### Adding a New Feature with Account Context

1. Create service method that uses `getAccountUuid()`
2. Add store actions in Pinia store
3. Create/update component with account watch pattern
4. Ensure layout detects route as authenticated if needed

### Testing Account Selection

1. Dev server runs at `http://localhost:5173`
2. Account selector appears after login
3. Switching accounts in dropdown reloads related data
4. Selected account persists in localStorage

### Debugging Account Issues

- Check browser localStorage for `selected_account_uuid`
- Verify `accountsStore.currentAccount` in Vue DevTools
- Check if route name is in `AUTHENTICATED_ROUTES` array in AuthLayout
- Ensure API calls include `account_uuid` parameter
