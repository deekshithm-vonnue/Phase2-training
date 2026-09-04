import React, { useState } from "react";
import "../styles/form.css";
import type { IssueProps, StatusType } from "./IssueCard";
import Button from "./Button";

export type PriorityType = "High" | "Medium" | "Low" | "Urgent";
export type LabelType =
  | "Bug"
  | "Feature"
  | "Documentation"
  | "Refactor"
  | "UI/UX"
  | undefined;
interface FormProps {
  onClose: () => void;
  onAddIssue: (newIssue: IssueProps) => void;
  initialData?: IssueProps & { id: string | number };
}

export default function Form({ onClose, onAddIssue, initialData }: FormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || "",
  );
  const [priority, setPriority] = useState<PriorityType>(
    initialData?.priority || "Medium",
  );
  const [status, setStatus] = useState<StatusType>(
    initialData?.status || "Pending",
  );
  const [dueDate, setDueDate] = useState<string>(
    initialData?.dueDate ? initialData.dueDate.toISOString().split("T")[0] : "",
  );
  const [label, setLabel] = useState<LabelType>(undefined);
  const [error, setError] = useState<Record<string, string>>({});
  const [assignee, setAssignee] = useState(initialData?.assignedTo || "");

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!title.trim()) {
      errors.title = "Title is required";
    } else if (title.trim().length < 3) {
      errors.title = "Title must be at least 3 characters long";
    }

    if (!description.trim()) {
      errors.description = "Description is required";
    }

    if (!assignee.trim()) {
      errors.assignee = "Please assign this issue to someone";
    }

    if (dueDate) {
      const selectedDate = new Date(dueDate);
      const today = new Date();

      if (isNaN(selectedDate.getTime())) {
        errors.dueDate = "Due date is invalid";
      } else {
        today.setHours(0, 0, 0, 0);
        selectedDate.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
          errors.dueDate = "Due date cannot be in the past";
        }
      }
    } else {
      errors.dueDate = "Due date is missing";
    }

    if (!label) {
      errors.label = "You must select a valid label.";
    }
    setError(errors);

    return Object.keys(errors).length === 0;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validateForm();
    console.log("ds")
    if (!isValid) {
      return;
    }

    onAddIssue({
      ...(initialData?.id ? { id: initialData.id } : {}),
      title: title,
      description: description,
      priority: priority,
      status: status,
      assignedTo: assignee,
      dueDate: new Date(dueDate),
      label: label,
    });

    // onClose();
  };
  return (
    <div className="form-modal-overlay">
      <form id="form" className="issue-creation-form" onSubmit={handleSubmit}>
        <div className="form-header-row">
          <h3>{initialData ? "Edit Issue" : "Create New Issue"}</h3>
          <button type="button" className="close-x-btn" onClick={onClose}>
            X
          </button>
        </div>

        <div className="form-group-field">
          <label htmlFor="form-title">Title</label>
          <input
            id="form-title"
            type="text"
            placeholder="what is wrong"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="error-layout">{error.title}</div>
        </div>

        <div className="form-group-field">
          <label htmlFor="form-desc">Description</label>
          <textarea
            id="form-desc"
            placeholder="Provide description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="error-layout">{error.description}</div>
        </div>

        <div className="form-group-field">
          <label htmlFor="form-priority">Priority</label>
          <select
            id="form-priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as PriorityType)}
          >
            <option value="Urgent">Urgent</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="form-group-field">
          <label htmlFor="form-status">Status</label>
          <select
            id="form-status"
            value={status}
            onChange={(e) => setStatus(e.target.value as StatusType)}
          >
            <option value="Pending">Pending</option>
            <option value="In_Progress">In_Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="form-group-field">
          <label htmlFor="form-date">Due Date</label>
          <input
            id="form-date"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <div className="error-layout">{error.dueDate}</div>
        </div>

        <div className="form-group-field">
          <label htmlFor="form-assignee">assignee</label>
          <input
            id="form-assignee"
            type="text"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
          />
          <div className="error-layout">{error.assignee}</div>
        </div>

        <div className="form-group-field">
          <label htmlFor="form-label">Label</label>
          <select
            id="form-label"
            value={label}
            onChange={(e) => {
              const value = e.target.value;
              setLabel(value === "" ? undefined : (value as LabelType));
            }}
          >
            <option value="">Select a label</option>
            <option value="Bug">Bug</option>
            <option value="Feature">Feature</option>
            <option value="Documentation">Documentation</option>
            <option value="Refactor">Refactor</option>
          </select>
          <div className="error-layout">{error.label}</div>
        </div>
        <div className="sumbit-button">
          <Button type="submit">
            {" "}
            {initialData ? "Save Changes" : "Add Issue"}
          </Button>
        </div>
      </form>
    </div>
  );
}
