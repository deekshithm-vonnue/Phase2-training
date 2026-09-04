import { useState, type ChangeEvent } from "react";
import mockData from "../../mockdata.json";
import { EmptyState } from "../components/EmptyState";
import IssueCard, {
  type IssueProps,
  type StatusType,
} from "../components/IssueCard";
import SearchFilter from "../components/search";
import Filter, { type FilterOption } from "../components/Filter";
import Button from "../components/Button";
import Form from "../components/Form";

interface RawMockIssue {
  id: string | number;
  title: string;
  description: string;
  priority?: string;
  status?: string;
  dueDate?: string | null;
  assignedTo?: string;
}

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
    (IssueProps & { id: string | number }) | null
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

  const validIssues = (mockData.issues as RawMockIssue[]).map((issue) => ({
    id: issue.id,
    title: issue.title,
    description: issue.description,
    priority:
      (issue.priority as "Urgent" | "High" | "Medium" | "Low") || "Medium",
    status: (issue.status as StatusType) || "Pending",
    dueDate: issue.dueDate ? new Date(issue.dueDate) : undefined,
    assignedTo: issue.assignedTo || "Unassigned",
  }));

  const [issues, setIssues] =
    useState<(IssueProps & { id: string | number })[]>(validIssues);

  const handleSaveIssue = (
    newIssueData: IssueProps & { id?: string | number },
  ) => {
    if (newIssueData.id) {
      setIssues((prevIssues) =>
        prevIssues.map((item) =>
          item.id === newIssueData.id ? { ...item, ...newIssueData } : item,
        ),
      );
    } else {
      const newIssue = {
        ...newIssueData,
        id: crypto.randomUUID(),
      };
      setIssues((prevIssue) => [...prevIssue, newIssue]);
      // setIsFormOpen(false);
    }
    setIsFormOpen(false);
    setEditingIssue(null)
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
