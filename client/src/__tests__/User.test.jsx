import { render, screen, fireEvent } from "@testing-library/react";
import User from "../components/User";
import { vi, beforeEach, expect } from "vitest";
import "@testing-library/jest-dom";

describe("User Component", () => {
  const mockDeleteUser = vi.fn();
  const mockUpdateUserPoints = vi.fn();
  const mockSetShowUserModal = vi.fn();
  const mockSetCurrentUser = vi.fn();

  beforeEach(() => {
    const mockIntersectionObserver = vi.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  const mockItem = {
    _id: "68132f829b719e19c0da871b",
    name: "Anne Holmes",
    age: 33,
    address: "10 152nd Street, Surrey, BC",
    points: 0,
  };

  it("renders user details correctly", () => {
    render(
      <User
        item={mockItem}
        index={0}
        deleteUser={mockDeleteUser}
        updateUserPoints={mockUpdateUserPoints}
        setShowUserModal={mockSetShowUserModal}
        setCurrentUser={mockSetCurrentUser}
      />
    );

    expect(screen.getByText(mockItem.name)).toBeInTheDocument();
    expect(screen.getByText(mockItem.points)).toBeInTheDocument();
  });

  it("handles adding points", () => {
    render(
      <User
        item={mockItem}
        index={0}
        deleteUser={mockDeleteUser}
        updateUserPoints={mockUpdateUserPoints}
        setShowUserModal={mockSetShowUserModal}
        setCurrentUser={mockSetCurrentUser}
      />
    );

    const addButton = screen.getByRole("add", {
      label: /add 10 points/i,
    });
    fireEvent.click(addButton);

    expect(screen.getByText(mockItem.points)).toBeInTheDocument();
  });

  it("handles subtracting points", () => {
    render(
      <User
        item={mockItem}
        index={0}
        deleteUser={mockDeleteUser}
        updateUserPoints={mockUpdateUserPoints}
        setShowUserModal={mockSetShowUserModal}
        setCurrentUser={mockSetCurrentUser}
      />
    );

    const subtractButton = screen.getByRole("subtract", {
      label: /subtract 10 points/i,
    });
    fireEvent.click(subtractButton);

    expect(screen.getByText(mockItem.points)).toBeInTheDocument();
  });

  it("handles user deletion", () => {
    render(
      <User
        item={mockItem}
        index={0}
        deleteUser={mockDeleteUser}
        updateUserPoints={mockUpdateUserPoints}
        setShowUserModal={mockSetShowUserModal}
        setCurrentUser={mockSetCurrentUser}
      />
    );

    const deleteButton = screen.getByRole("delete", { label: /delete user/i });
    fireEvent.click(deleteButton);

    expect(mockDeleteUser).toHaveBeenCalledWith(mockItem._id);
  });

  it("opens user modal when the name is clicked", () => {
    render(
      <User
        item={mockItem}
        index={0}
        deleteUser={mockDeleteUser}
        updateUserPoints={mockUpdateUserPoints}
        setShowUserModal={mockSetShowUserModal}
        setCurrentUser={mockSetCurrentUser}
      />
    );

    const nameButton = screen.getByText(mockItem.name);
    fireEvent.click(nameButton);

    expect(mockSetShowUserModal).toHaveBeenCalledWith(true);
    expect(mockSetCurrentUser).toHaveBeenCalledWith(mockItem);
  });
});
