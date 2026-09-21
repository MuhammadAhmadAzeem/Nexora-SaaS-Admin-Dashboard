import { useEffect, useState } from "react";
import {
  Bell,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Monitor,
  Save,
  ShieldCheck,
  User,
} from "lucide-react";

const PROFILE_KEY = "nexora-profile";
const SETTINGS_KEY = "nexora-settings";

const defaultProfile = {
  name: "Ahmad Azeem",
  email: "ahmad@example.com",
  role: "Administrator",
};

const defaultSettings = {
  emailNotifications: true,
  taskNotifications: true,
  projectNotifications: true,
  marketingNotifications: false,
};

function getStoredData(key, fallback) {
  try {
    const saved = localStorage.getItem(key);

    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

export default function Settings() {
  const [activeSection, setActiveSection] =
    useState("profile");

  const [profile, setProfile] = useState(() =>
    getStoredData(PROFILE_KEY, defaultProfile)
  );

  const [settings, setSettings] = useState(() =>
    getStoredData(SETTINGS_KEY, defaultSettings)
  );

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [profileMessage, setProfileMessage] = useState("");
  const [securityMessage, setSecurityMessage] = useState("");
  const [securityError, setSecurityError] = useState("");

  useEffect(() => {
    localStorage.setItem(
      SETTINGS_KEY,
      JSON.stringify(settings)
    );
  }, [settings]);

  const handleProfileChange = (event) => {
    const { name, value } = event.target;

    setProfile((current) => ({
      ...current,
      [name]: value,
    }));

    setProfileMessage("");
  };

  const handleProfileSave = (event) => {
    event.preventDefault();

    if (!profile.name.trim()) return;

    localStorage.setItem(
      PROFILE_KEY,
      JSON.stringify({
        ...profile,
        name: profile.name.trim(),
      })
    );

    setProfileMessage("Profile settings saved successfully.");

    setTimeout(() => {
      setProfileMessage("");
    }, 3000);
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;

    setPasswords((current) => ({
      ...current,
      [name]: value,
    }));

    setSecurityError("");
    setSecurityMessage("");
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();

    if (
      !passwords.currentPassword ||
      !passwords.newPassword ||
      !passwords.confirmPassword
    ) {
      setSecurityError("Please complete all password fields.");
      return;
    }

    if (passwords.newPassword.length < 8) {
      setSecurityError(
        "New password must be at least 8 characters."
      );
      return;
    }

    if (
      passwords.newPassword !== passwords.confirmPassword
    ) {
      setSecurityError(
        "New password and confirmation do not match."
      );
      return;
    }

    setSecurityError("");
    setSecurityMessage(
      "Password updated successfully."
    );

    setPasswords({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setTimeout(() => {
      setSecurityMessage("");
    }, 3000);
  };

  const toggleSetting = (key) => {
    setSettings((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  const sections = [
    {
      id: "profile",
      label: "Profile",
      icon: User,
    },
    {
      id: "security",
      label: "Security",
      icon: LockKeyhole,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
    },
    {
      id: "appearance",
      label: "Appearance",
      icon: Monitor,
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <section>
        <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
          Preferences
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
          Settings
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
          Manage your profile, security, notifications and application
          preferences.
        </p>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        {/* Settings Navigation */}
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <nav className="space-y-1">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive =
                activeSection === section.id;

              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() =>
                    setActiveSection(section.id)
                  }
                  className={`
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-2.5
                    text-left
                    text-sm
                    font-semibold
                    transition
                    ${
                      isActive
                        ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                    }
                  `}
                >
                  <Icon size={17} />
                  {section.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Content */}
        <div>
          {/* Profile */}
          {activeSection === "profile" && (
            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <SettingsHeader
                icon={User}
                title="Profile Information"
                description="Update your personal account information."
              />

              <form
                onSubmit={handleProfileSave}
                className="space-y-6 p-5 sm:p-6"
              >
                <div className="flex items-center gap-4 border-b border-slate-200 pb-6 dark:border-slate-800">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-blue-600 to-cyan-500 text-lg font-bold text-white">
                    AA
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      {profile.name}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {profile.role}
                    </p>
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField
                    label="Full Name"
                    name="name"
                    value={profile.name}
                    onChange={handleProfileChange}
                  />

                  <FormField
                    label="Email Address"
                    name="email"
                    type="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                  />

                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                      Role
                    </label>

                    <input
                      value={profile.role}
                      disabled
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
                    />
                  </div>
                </div>

                <SaveActions
                  message={profileMessage}
                  buttonText="Save Profile"
                />
              </form>
            </section>
          )}

          {/* Security */}
          {activeSection === "security" && (
            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <SettingsHeader
                icon={ShieldCheck}
                title="Security"
                description="Keep your account secure by managing your password."
              />

              <form
                onSubmit={handlePasswordSubmit}
                className="space-y-5 p-5 sm:p-6"
              >
                {securityError && (
                  <Message type="error">
                    {securityError}
                  </Message>
                )}

                {securityMessage && (
                  <Message type="success">
                    {securityMessage}
                  </Message>
                )}

                <PasswordField
                  label="Current Password"
                  name="currentPassword"
                  value={passwords.currentPassword}
                  onChange={handlePasswordChange}
                  visible={showPasswords.current}
                  onToggle={() =>
                    setShowPasswords((current) => ({
                      ...current,
                      current: !current.current,
                    }))
                  }
                />

                <PasswordField
                  label="New Password"
                  name="newPassword"
                  value={passwords.newPassword}
                  onChange={handlePasswordChange}
                  visible={showPasswords.new}
                  onToggle={() =>
                    setShowPasswords((current) => ({
                      ...current,
                      new: !current.new,
                    }))
                  }
                />

                <PasswordField
                  label="Confirm New Password"
                  name="confirmPassword"
                  value={passwords.confirmPassword}
                  onChange={handlePasswordChange}
                  visible={showPasswords.confirm}
                  onToggle={() =>
                    setShowPasswords((current) => ({
                      ...current,
                      confirm: !current.confirm,
                    }))
                  }
                />

                <SaveActions
                  buttonText="Update Password"
                />
              </form>
            </section>
          )}

          {/* Notifications */}
          {activeSection === "notifications" && (
            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <SettingsHeader
                icon={Bell}
                title="Notification Preferences"
                description="Choose which notifications you want to receive."
              />

              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                <ToggleRow
                  title="Email Notifications"
                  description="Receive important account updates by email."
                  checked={settings.emailNotifications}
                  onChange={() =>
                    toggleSetting("emailNotifications")
                  }
                />

                <ToggleRow
                  title="Task Notifications"
                  description="Get notified when tasks are assigned or updated."
                  checked={settings.taskNotifications}
                  onChange={() =>
                    toggleSetting("taskNotifications")
                  }
                />

                <ToggleRow
                  title="Project Notifications"
                  description="Receive updates about project activity."
                  checked={settings.projectNotifications}
                  onChange={() =>
                    toggleSetting("projectNotifications")
                  }
                />

                <ToggleRow
                  title="Marketing Notifications"
                  description="Receive product news, tips and announcements."
                  checked={settings.marketingNotifications}
                  onChange={() =>
                    toggleSetting("marketingNotifications")
                  }
                />
              </div>

              <div className="border-t border-slate-200 p-5 dark:border-slate-800 sm:p-6">
                <Message type="success">
                  Notification preferences are saved automatically.
                </Message>
              </div>
            </section>
          )}

          {/* Appearance */}
          {activeSection === "appearance" && (
            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <SettingsHeader
                icon={Monitor}
                title="Appearance"
                description="Choose how Nexora looks on your device."
              />

              <div className="p-5 sm:p-6">
                <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                      <Monitor size={18} />
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                        Theme
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                        Use the theme toggle in the top navigation to switch
                        between light and dark mode.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

function SettingsHeader({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div className="flex items-start gap-3 border-b border-slate-200 p-5 sm:p-6 dark:border-slate-800">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
        <Icon size={18} />
      </div>

      <div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          {title}
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
}

function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
}) {
  return (
    <div>
      <label
        htmlFor={`settings-${name}`}
        className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
      >
        {label}
      </label>

      <input
        id={`settings-${name}`}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
      />
    </div>
  );
}

function PasswordField({
  label,
  name,
  value,
  onChange,
  visible,
  onToggle,
}) {
  return (
    <div>
      <label
        htmlFor={`settings-${name}`}
        className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={`settings-${name}`}
          name={name}
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 pr-11 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
        />

        <button
          type="button"
          onClick={onToggle}
          aria-label={
            visible
              ? `Hide ${label}`
              : `Show ${label}`
          }
          className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
        >
          {visible ? (
            <EyeOff size={16} />
          ) : (
            <Eye size={16} />
          )}
        </button>
      </div>
    </div>
  );
}

function ToggleRow({
  title,
  description,
  checked,
  onChange,
}) {
  return (
    <div className="flex items-center justify-between gap-5 p-5 sm:p-6">
      <div>
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
          {title}
        </h3>

        <p className="mt-1 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={onChange}
        className={`
          relative
          h-6
          w-11
          shrink-0
          rounded-full
          transition
          ${
            checked
              ? "bg-blue-600"
              : "bg-slate-300 dark:bg-slate-700"
          }
        `}
      >
        <span
          className={`
            absolute
            top-1
            h-4
            w-4
            rounded-full
            bg-white
            shadow-sm
            transition-transform
            ${
              checked
                ? "translate-x-6"
                : "translate-x-1"
            }
          `}
        />
      </button>
    </div>
  );
}

function SaveActions({
  message,
  buttonText,
}) {
  return (
    <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-end dark:border-slate-800">
      {message && (
        <div className="mr-auto flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400">
          <Check size={16} />
          {message}
        </div>
      )}

      <button
        type="submit"
        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 px-5 text-sm font-semibold text-white shadow-sm shadow-blue-500/20 transition hover:from-blue-700 hover:to-cyan-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/20"
      >
        <Save size={16} />
        {buttonText}
      </button>
    </div>
  );
}

function Message({ type, children }) {
  const isSuccess = type === "success";

  return (
    <div
      className={`
        rounded-xl
        border
        px-4
        py-3
        text-sm
        font-medium
        ${
          isSuccess
            ? "border-green-200 bg-green-50 text-green-600 dark:border-green-500/20 dark:bg-green-500/10 dark:text-green-400"
            : "border-red-200 bg-red-50 text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400"
        }
      `}
    >
      {children}
    </div>
  );
}