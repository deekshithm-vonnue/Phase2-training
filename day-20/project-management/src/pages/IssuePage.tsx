import { useState, type ChangeEvent } from "react";
import mockData from "../../mockdata.json";
import { EmptyState } from "../components/EmptyState";
import IssueCard, { type StatusType } from "../components/IssueCard";
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
    { label: "In_progress", value: "In_progress" },
    { label: "Completed", value: "Completed" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [sortOrder, setSortOrder] = useState("desc");
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  const handleSortOrdering = () => {
    if (sortOrder == "desc") {
      setSortOrder("asc");
    } else {
      setSortOrder("desc");
    }
  };

  const handleReset = () => {
    setSelectedPriority("All");
    setSelectedStatus("All");
  };

  function handlePriorityChange(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedPriority(event.target.value);
  }

  function handleStatusChange(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedStatus(event.target.value);
  }

  const validIssues = (mockData.issues as RawMockIssue[]).map((issue) => {
    return {
      id: issue.id,
      title: issue.title,
      description: issue.description,
      priority:
        (issue.priority as "Urgent" | "High" | "Medium" | "Low") || "Medium",
      status: (issue.status as StatusType) || "Pending",
      dueDate: issue.dueDate ? new Date(issue.dueDate) : undefined,
      assignedTo: issue.assignedTo || "Unassigned",
    };
  });

  const sortIssue = validIssues.sort((a, b) => {
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    if (sortOrder == "asc") return a.dueDate.getTime() - b.dueDate.getTime();
    else return b.dueDate.getTime() - a.dueDate.getTime();
  });
  const searchedIssue = sortIssue.filter((issue) => {
    const matchesPriority =
      selectedPriority.toLowerCase() === "all" ||
      issue.priority.toLowerCase() === selectedPriority.toLowerCase();

    const matchesStatus =
      selectedStatus.toLowerCase() == "all" ||
      issue.status.toLowerCase() === selectedStatus.toLowerCase();

    const query = searchTerm.trim().toLowerCase();
    const matchesSearch =
      issue.title.toLowerCase().includes(query) ||
      issue.description.toLowerCase().includes(query);

    return matchesStatus && matchesSearch && matchesPriority;
  });

  return (
    <div className="issuePage">
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
          <Button handleFunction={handleSortOrdering}>sort</Button>
          <Button handleFunction={handleReset}>clear filter</Button>
        </div>
        <Button handleFunction={() => setIsFormOpen(true)}>Add issue</Button>
      </div>
      {isFormOpen && <Form />}
      {searchedIssue.length === 0 ? (
        <EmptyState type="issues" />
      ) : (
        <div className="issue-list-wrapper">
          {searchedIssue.map((issue) => (
            <IssueCard
              key={issue.id}
              title={issue.title}
              description={issue.description}
              priority={issue.priority}
              status={issue.status}
              dueDate={issue.dueDate}
              assignedTo={issue.assignedTo}
            />
          ))}
        </div>
      )}
    </div>
  );
}
