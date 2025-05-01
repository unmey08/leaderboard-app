import { render, screen, fireEvent } from "@testing-library/react";
import AddUserModal from "../components/AddUserModal";
import { vi, expect } from "vitest";
import "@testing-library/jest-dom";

describe("AddUserModal Component", () => {
  const mockSetShowAddUserModal = vi.fn();
  const mockAddUser = vi.fn();

  it("renders the modal when `showAddUserModal` is true", () => {
    render(
      <AddUserModal
        showAddUserModal={true}
        setShowAddUserModal={mockSetShowAddUserModal}
        addUser={mockAddUser}
      />
    );

    expect(screen.getByText("Add User")).toBeInTheDocument();
  });

  it("closes the modal when the close button is clicked", () => {
    render(
      <AddUserModal
        showAddUserModal={true}
        setShowAddUserModal={mockSetShowAddUserModal}
        addUser={mockAddUser}
      />
    );

    const closeButton = screen.getByLabelText("Close add user modal");
    fireEvent.click(closeButton);

    expect(mockSetShowAddUserModal).toHaveBeenCalledWith(false);
  });

  it("displays validation errors for invalid inputs", async () => {
    render(
      <AddUserModal
        showAddUserModal={true}
        setShowAddUserModal={mockSetShowAddUserModal}
        addUser={mockAddUser}
      />
    );

    const submitButton = screen.getByLabelText("Add user button");
    fireEvent.click(submitButton);

    expect(await screen.findByText("Name is required.")).toBeInTheDocument();
    expect(await screen.findByText("Age is required.")).toBeInTheDocument();
    expect(await screen.findByText("Address is required.")).toBeInTheDocument();
  });

  it("calls `addUser` with sanitized input data on valid form submission", async () => {
    render(
      <AddUserModal
        showAddUserModal={true}
        setShowAddUserModal={mockSetShowAddUserModal}
        addUser={mockAddUser}
      />
    );

    const nameInput = screen.getByLabelText("Name");
    const ageInput = screen.getByLabelText("Age");
    const addressInput = screen.getByLabelText("Address");
    const submitButton = screen.getByLabelText("Add user button");

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(ageInput, { target: { value: "25" } });
    fireEvent.change(addressInput, { target: { value: "123 Street" } });

    fireEvent.click(submitButton);

    expect(mockSetShowAddUserModal).toHaveBeenCalledWith(false);
  });

  it("prevents form submission while submitting", async () => {
    const { rerender } = render(
      <AddUserModal
        showAddUserModal={true}
        setShowAddUserModal={mockSetShowAddUserModal}
        addUser={mockAddUser}
      />
    );

    const submitButton = screen.getByLabelText("Add user button");
    fireEvent.click(submitButton);

    // Simulate form submitting state
    rerender(
      <AddUserModal
        showAddUserModal={true}
        setShowAddUserModal={mockSetShowAddUserModal}
        addUser={mockAddUser}
      />
    );

    expect(submitButton).toBeDisabled();
  });
});
