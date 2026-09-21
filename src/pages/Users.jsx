import { useMemo, useState } from "react";
import { Plus, Search, Users as UsersIcon, X } from "lucide-react";

import Modal from "../components/common/Modal";
import Pagination from "../components/common/Pagination";
import UserForm from "../components/users/UserForm";
import UserTable from "../components/users/UserTable";
import usersData from "../data/users";

const ITEMS_PER_PAGE = 5;

export default function Users() {
  const [users, setUsers] = useState(usersData);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        !query ||
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query);

      const matchesRole =
        roleFilter === "All" || user.role === roleFilter;

      const matchesStatus =
        statusFilter === "All" || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredUsers.length / ITEMS_PER_PAGE)
  );

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedUsers = useMemo(() => {
    const startIndex =
      (safeCurrentPage - 1) * ITEMS_PER_PAGE;

    return filteredUsers.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
  }, [filteredUsers, safeCurrentPage]);

  const openCreateModal = () => {
    setSelectedUser(null);
    setSubmitError("");
    setIsModalOpen(true);
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setSubmitError("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (isSubmitting) return;

    setIsModalOpen(false);
    setSelectedUser(null);
    setSubmitError("");
  };

  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleRoleChange = (event) => {
    setRoleFilter(event.target.value);
    setCurrentPage(1);
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
    setCurrentPage(1);
  };

  const handleCreateUser = async (formData) => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newUser = {
        id: Date.now(),
        ...formData,
        joinedAt: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      setUsers((currentUsers) => [
        newUser,
        ...currentUsers,
      ]);

      setCurrentPage(1);
      setIsModalOpen(false);
    } catch {
      setSubmitError("Unable to create user. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateUser = async (formData) => {
    if (!selectedUser) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user.id === selectedUser.id
            ? {
                ...user,
                ...formData,
              }
            : user
        )
      );

      setIsModalOpen(false);
      setSelectedUser(null);
    } catch {
      setSubmitError("Unable to update user. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = (user) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${user.name}?`
    );

    if (!confirmed) return;

    setUsers((currentUsers) =>
      currentUsers.filter(
        (currentUser) => currentUser.id !== user.id
      )
    );

    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <section>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Management
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              Users
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
              Manage users, roles and account access across your workspace.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            className="
              inline-flex
              h-11
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-linear-to-r
              from-blue-600
              to-cyan-500
              px-5
              text-sm
              font-semibold
              text-white
              shadow-sm
              shadow-blue-500/20
              transition
              hover:from-blue-700
              hover:to-cyan-600
              focus-visible:outline-none
              focus-visible:ring-4
              focus-visible:ring-blue-500/20
            "
          >
            <Plus size={17} />
            Add User
          </button>
        </div>
      </section>

      {/* Filters */}
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm">
            <Search
              size={17}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="search"
              value={search}
              onChange={(event) =>
                handleSearchChange(event.target.value)
              }
              placeholder="Search users..."
              aria-label="Search users"
              className="
                h-11
                w-full
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                pl-10
                pr-10
                text-sm
                text-slate-900
                outline-none
                transition
                placeholder:text-slate-400
                focus:border-blue-400
                focus:bg-white
                focus:ring-4
                focus:ring-blue-500/10
                dark:border-slate-700
                dark:bg-slate-950
                dark:text-white
                dark:focus:bg-slate-950
              "
            />

            {search && (
              <button
                type="button"
                onClick={() => handleSearchChange("")}
                aria-label="Clear user search"
                className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <X size={15} />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:w-auto">
            <select
              value={roleFilter}
              onChange={handleRoleChange}
              aria-label="Filter users by role"
              className="
                h-11
                w-full
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                px-3
                text-sm
                font-medium
                text-slate-700
                outline-none
                focus:border-blue-400
                focus:ring-4
                focus:ring-blue-500/10
                sm:w-44
                dark:border-slate-700
                dark:bg-slate-950
                dark:text-slate-200
              "
            >
              <option value="All">All Roles</option>
              <option value="Administrator">Administrator</option>
              <option value="Manager">Manager</option>
              <option value="User">User</option>
            </select>

            <select
              value={statusFilter}
              onChange={handleStatusChange}
              aria-label="Filter users by status"
              className="
                h-11
                w-full
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                px-3
                text-sm
                font-medium
                text-slate-700
                outline-none
                focus:border-blue-400
                focus:ring-4
                focus:ring-blue-500/10
                sm:w-44
                dark:border-slate-700
                dark:bg-slate-950
                dark:text-slate-200
              "
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
          <UsersIcon size={15} />

          <span>
            Showing{" "}
            <strong className="font-semibold text-slate-600 dark:text-slate-300">
              {filteredUsers.length}
            </strong>{" "}
            {filteredUsers.length === 1 ? "user" : "users"}
          </span>
        </div>
      </section>

      {/* User Table */}
      <section>
        <UserTable
          users={paginatedUsers}
          onEdit={openEditModal}
          onDelete={handleDeleteUser}
        />

        <Pagination
          currentPage={safeCurrentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </section>

      {/* User Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={selectedUser ? "Edit User" : "Create User"}
        size="md"
      >
        <UserForm
          user={selectedUser}
          onSubmit={
            selectedUser
              ? handleUpdateUser
              : handleCreateUser
          }
          onCancel={closeModal}
          loading={isSubmitting}
          error={submitError}
        />
      </Modal>
    </div>
  );
}