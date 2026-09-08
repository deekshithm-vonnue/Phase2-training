import { useEffect, useState, type ChangeEvent } from "react";
import { EmptyState } from "../components/EmptyState";
import IssueCard, { type IssueProps } from "../components/IssueCard";
import SearchFilter from "../components/search";
import Filter, { type FilterOption } from "../components/Filter";
import Button from "../components/Button";
import Form from "../components/Form";
import type { Issue } from "../types/project";
import { issueApi } from "../apiclient/issueapi";

export default function RenderIssueList() {
  const priorityOptions: FilterOption[] = [
    { label: "All", value: "All" },
    { label: "Urgent", value: "Urgent" },
    { label: "High", value: "High" },
    { label: "Medium", value: "Medium" },
    { label: "Low", value: "Low" },
  ];

  const statusOptions: FilterOption[] = [
    { label: "All", value: "All" },
    { label: "Pending", value: "Pending" },
    { label: "In Progress", value: "In_Progress" },
    { label: "Completed", value: "Completed" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [sortOrder, setSortOrder] = useState("desc");
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingIssue, setEditingIssue] = useState<
    (IssueProps & { id: string }) | null
  >(null);

  const handleOpenEditModal = (id: string | number) => {
    const targetIssue = issues.find((issue) => issue.id === id);
    if (targetIssue) {
      setEditingIssue(targetIssue);
      setIsFormOpen(true);
    }
  };
  const handleSortOrdering = () => {
    setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
  };

  const handleReset = () => {
    setSelectedPriority("All");
    setSelectedStatus("All");
    setSearchTerm("");
  };

  const handleOpenModal = () => {
    setEditingIssue(null);
    setIsFormOpen(true);
  };

  function handlePriorityChange(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedPriority(event.target.value);
  }

  function handleStatusChange(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedStatus(event.target.value);
  }

  const handleCancelClick = () => {
    const confirmDiscard = window.confirm(
      "You have unsaved changes. Are you sure you want to close this form?",
    );
    if (confirmDiscard) {
      setIsFormOpen(false);
      setEditingIssue(null);
    }
  };

  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadIssues = async () => {
      try {
        setLoading(true);
        const data = await issueApi.getAll();
        const parsedIssues = data.map((issue) => ({
          ...issue,
          dueDate: new Date(issue.dueDate),
        }));

        setIssues(parsedIssues);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load projects",
        );
      } finally {
        setLoading(false);
      }
    };
    loadIssues();
  }, [setIssues]);

  const handleSaveIssue = (newIssueData: IssueProps & { id?: string }) => {
    if (newIssueData.id) {
      setIssues((prevIssues) =>
        prevIssues.map((item) => {
          if (item.id === newIssueData.id) {
            return {
              ...item,
              title: newIssueData.title,
              description: newIssueData.description,
              priority: newIssueData.priority || item.priority,
              status: newIssueData.status || item.status,
              dueDate: newIssueData.dueDate || item.dueDate,
              assignedTo: newIssueData.assignedTo || item.assignedTo,
              label: newIssueData.label,
            };
          }
          return item;
        }),
      );
    } else {
      const newIssue: Issue = {
        id: crypto.randomUUID(),
        title: newIssueData.title,
        description: newIssueData.description,
        priority: newIssueData.priority || "Medium",
        status: newIssueData.status || "Pending",
        dueDate: newIssueData.dueDate || new Date(),
        assignedTo: newIssueData.assignedTo || "Unassigned",
        projectId: "local-project-context",
        label: newIssueData.label,
      };
      setIssues((prevIssue) => [...prevIssue, newIssue]);
    }
    setIsFormOpen(false);
    setEditingIssue(null);
  };

  const sortedIssues = [...issues].sort((a, b) => {
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return sortOrder === "asc"
      ? a.dueDate.getTime() - b.dueDate.getTime()
      : b.dueDate.getTime() - a.dueDate.getTime();
  });

  const searchedIssue = sortedIssues.filter((issue) => {
    const matchesPriority =
      selectedPriority.toLowerCase() === "all" ||
      issue.priority!.toLowerCase() === selectedPriority.toLowerCase();

    const normalizedIssueStatus = issue.status!.toLowerCase().replace("_", "");
    const normalizedSelectedStatus = selectedStatus
      .toLowerCase()
      .replace("_", "");

    const matchesStatus =
      selectedStatus.toLowerCase() === "all" ||
      normalizedIssueStatus === normalizedSelectedStatus;

    const query = searchTerm.trim().toLowerCase();
    const matchesSearch =
      issue.title.toLowerCase().includes(query) ||
      issue.description.toLowerCase().includes(query);

    return matchesStatus && matchesSearch && matchesPriority;
  });

  if (loading) return <div className="loading-state"></div>;
  if (error) return <div className="error-state">UNAVAIL</div>;
  return (
    <div className="issuePage">
      {isFormOpen && (
        <Form
          onClose={handleCancelClick}
          onAddIssue={handleSaveIssue}
          initialData={editingIssue || undefined}
        />
      )}
      <div className="filter-controls-header">
        <SearchFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <div className="filter-controls-layout">
          <Filter
            type="priority"
            options={priorityOptions}
            selectedValue={selectedPriority}
            handleFilter={handlePriorityChange}
          />
          <Filter
            type="status"
            options={statusOptions}
            selectedValue={selectedStatus}
            handleFilter={handleStatusChange}
          />
          <Button handleFunction={handleSortOrdering}>
            Sort ({sortOrder === "asc" ? "Oldest" : "Newest"})
          </Button>
          <Button handleFunction={handleReset}>Clear Filter</Button>
        </div>
        <Button handleFunction={handleOpenModal}>Add Issue</Button>
      </div>

      {searchedIssue.length === 0 ? (
        <EmptyState type="issues" />
      ) : (
        <div className="issue-list-wrapper">
          {searchedIssue.map((issue) => (
            <IssueCard
              key={issue.id}
              id={issue.id}
              title={issue.title}
              description={issue.description}
              priority={issue.priority}
              status={issue.status}
              dueDate={issue.dueDate}
              assignedTo={issue.assignedTo}
              onEditClick={handleOpenEditModal}
            />
          ))}
        </div>
      )}
    </div>
  );
}
