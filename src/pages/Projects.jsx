import { useMemo, useState } from "react";
import {
  FolderKanban,
  Plus,
  Search,
  X,
} from "lucide-react";

import Modal from "../components/common/Modal";
import ProjectForm from "../components/projects/ProjectForm";
import ProjectList from "../components/projects/ProjectList";
import projectsData from "../data/projects";

export default function Projects() {
  const [projects, setProjects] = useState(projectsData);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesSearch =
        !query ||
        project.name.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" ||
        project.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" ||
        project.priority === priorityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    });
  }, [
    projects,
    search,
    statusFilter,
    priorityFilter,
  ]);

  const openCreateModal = () => {
    setSelectedProject(null);
    setSubmitError("");
    setIsModalOpen(true);
  };

  const openEditModal = (project) => {
    setSelectedProject(project);
    setSubmitError("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (isSubmitting) return;

    setIsModalOpen(false);
    setSelectedProject(null);
    setSubmitError("");
  };

  const handleCreateProject = async (formData) => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      await new Promise((resolve) =>
        setTimeout(resolve, 500)
      );

      const newProject = {
        id: Date.now(),
        ...formData,
      };

      setProjects((currentProjects) => [
        newProject,
        ...currentProjects,
      ]);

      setIsModalOpen(false);
    } catch {
      setSubmitError(
        "Unable to create project. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateProject = async (formData) => {
    if (!selectedProject) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      await new Promise((resolve) =>
        setTimeout(resolve, 500)
      );

      setProjects((currentProjects) =>
        currentProjects.map((project) =>
          project.id === selectedProject.id
            ? {
                ...project,
                ...formData,
              }
            : project
        )
      );

      setIsModalOpen(false);
      setSelectedProject(null);
    } catch {
      setSubmitError(
        "Unable to update project. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProject = (project) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${project.name}"?`
    );

    if (!confirmed) return;

    setProjects((currentProjects) =>
      currentProjects.filter(
        (currentProject) =>
          currentProject.id !== project.id
      )
    );
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setPriorityFilter("All");
  };

  const hasFilters =
    search ||
    statusFilter !== "All" ||
    priorityFilter !== "All";

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <section>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Workspace
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              Projects
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
              Manage projects, priorities, progress and deadlines.
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
            Add Project
          </button>
        </div>
      </section>

      {/* Filters */}
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="relative w-full xl:max-w-sm">
            <Search
              size={17}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search projects..."
              aria-label="Search projects"
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
                onClick={() => setSearch("")}
                aria-label="Clear project search"
                className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <X size={15} />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:flex">
            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
              aria-label="Filter projects by status"
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
                xl:w-44
                dark:border-slate-700
                dark:bg-slate-950
                dark:text-slate-200
              "
            >
              <option value="All">All Statuses</option>
              <option value="Planning">Planning</option>
              <option value="In Progress">
                In Progress
              </option>
              <option value="Completed">Completed</option>
              <option value="On Hold">On Hold</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(event) =>
                setPriorityFilter(event.target.value)
              }
              aria-label="Filter projects by priority"
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
                xl:w-44
                dark:border-slate-700
                dark:bg-slate-950
                dark:text-slate-200
              "
            >
              <option value="All">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="
                  inline-flex
                  h-11
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-4
                  text-sm
                  font-semibold
                  text-slate-600
                  transition
                  hover:bg-slate-50
                  dark:border-slate-700
                  dark:bg-slate-900
                  dark:text-slate-300
                  dark:hover:bg-slate-800
                "
              >
                <X size={15} />
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
          <FolderKanban size={15} />

          <span>
            Showing{" "}
            <strong className="font-semibold text-slate-600 dark:text-slate-300">
              {filteredProjects.length}
            </strong>{" "}
            {filteredProjects.length === 1
              ? "project"
              : "projects"}
          </span>
        </div>
      </section>

      {/* Project List */}
      <ProjectList
        projects={filteredProjects}
        onEdit={openEditModal}
        onDelete={handleDeleteProject}
      />

      {/* Project Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={
          selectedProject
            ? "Edit Project"
            : "Create Project"
        }
        size="lg"
      >
        <ProjectForm
          project={selectedProject}
          onSubmit={
            selectedProject
              ? handleUpdateProject
              : handleCreateProject
          }
          onCancel={closeModal}
          loading={isSubmitting}
          error={submitError}
        />
      </Modal>
    </div>
  );
}