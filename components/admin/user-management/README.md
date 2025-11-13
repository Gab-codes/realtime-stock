# Admin User Details Page

## Overview

This is a dedicated user details page for the admin dashboard that allows administrators to view and manage individual user information, verify KYC documents, and manage user transactions.

## Features

### 1. **User Details Header**

- Display user's basic information (name, email, role, KYC status)
- Quick stats showing:
  - Total Deposits
  - Total Withdrawals
  - Active Investments
  - Join Date
- **Inline Edit**: Admins can click "Edit Name" to modify the user's name directly
- Visual user avatar with gradient background

### 2. **KYC Verification Section**

- Display KYC status (Pending, Verified, or Rejected)
- Show document submission date
- Display preview of front and back ID images
- **"Review & Verify KYC"** button that opens a modal
- Modal allows admins to:
  - View full-size ID documents (front and back)
  - Approve the KYC documents
  - Reject the KYC documents
  - See detailed verification information

### 3. **Transaction Management Table**

- Display all user transactions with:
  - Type (Deposit/Withdrawal)
  - Amount
  - Description
  - Transaction Date
  - Current Status
- **Action Menu** for pending transactions:
  - Approve transaction
  - Reject transaction
- Completed transactions show a "—" indicator (no actions available)
- Color-coded transaction types and statuses for easy identification

## Component Structure

```
components/admin/user-management/
├── UserDetailsHeader.tsx          # User info and quick stats
├── KYCSection.tsx                  # KYC verification display
├── KYCModal.tsx                    # Modal for KYC approval/rejection
└── TransactionsTable.tsx           # Transaction management table

app/admin/user-management/
└── [id]/page.tsx                   # Main user details page (mounted as /admin/user-management/[id])
```

## File Structure & Routes

```
/admin/user-management              # List all users (UserTable)
/admin/user-management/[id]         # View specific user details (NEW)
```

## Usage

### Accessing the Page

Clicking "View User" in the user management table navigates to:

```
/admin/user-management/[id]
```

### Inline Name Editing

1. Click "Edit Name" button
2. Modify the name in the input field
3. Click "Save" to save or "Cancel" to discard changes

### KYC Verification

1. View the KYC status in the dedicated section
2. If status is "Pending", click "Review & Verify KYC Documents"
3. In the modal, review the front and back ID images
4. Click either "Approve" or "Reject"
5. The modal closes and status updates (frontend only in current version)

### Transaction Management

1. Pending transactions show an action menu (three-dot icon)
2. Click the menu to see "Approve" or "Reject" options
3. Click your choice to update the transaction status
4. Approved/Rejected transactions no longer show action buttons

## Styling

All components use:

- **Dark Theme**: `bg-gray-800`, `text-white` for consistency
- **Color Variables**: From `globals.css`:

  - `--color-gray-900`: `#050505` (background)
  - `--color-gray-800`: `#141414` (cards)
  - `--color-gray-600`: `#30333a` (borders)
  - `--color-yellow-400`: `#fdd458` (accents)
  - `--color-green-600`: `#059669` (success)
  - `--color-red-500`: `#ff495b` (danger)

- **Shadcn UI Components**:
  - `Button`
  - `Input`
  - `Badge`
  - `Dialog`
  - `Table`
  - `DropdownMenu`

## Mock Data

Currently, the page uses mock data for demonstration:

### User Data

```typescript
{
  id: "u1",
  name: "Gab Admin",
  email: "gab@example.com",
  role: "User",
  joinedDate: "December 1, 2024",
  kycStatus: "pending",
  totalDeposits: 25000,
  totalWithdraws: 5000,
  activeInvestments: 3
}
```

### KYC Data

```typescript
{
  status: "pending",
  frontImage: "https://...",  // Unsplash mock image
  backImage: "https://...",   // Unsplash mock image
  submittedDate: "November 8, 2025"
}
```

### Transactions

Mock transactions include deposits and withdrawals with various statuses (pending, approved, rejected).

## Future Enhancements

To make this production-ready, you'll need to:

1. **Replace Mock Data**: Connect to your backend API

   - Fetch user by ID: `GET /api/users/[id]`
   - Update user name: `PUT /api/users/[id]`
   - Fetch transactions: `GET /api/users/[id]/transactions`
   - Approve/Reject KYC: `POST /api/kyc/[id]/approve|reject`
   - Approve/Reject Transaction: `POST /api/transactions/[id]/approve|reject`

2. **Add Loading States**: Show spinners while API calls are in progress

3. **Error Handling**: Toast notifications for failed operations

4. **Confirmation Dialogs**: Add confirmation before rejecting KYC or transactions

5. **Real Image Handling**: Implement proper image upload and storage

## Responsive Design

The page is fully responsive:

- **Mobile**: Single column layout
- **Tablet**: 2-column grid (KYC on left, Transactions on right)
- **Desktop**: Full 3-column grid with optimized spacing

## Accessibility

- Proper semantic HTML
- ARIA labels where needed
- Keyboard-friendly interactions
- High contrast text on dark backgrounds

---

**Note**: All functionality currently uses mock data and frontend-only state management. API integration will be needed for production use.
