import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@heroui/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { logIn } from "../services/middle-ware";
import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

export default function NavbarCustom(props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await logIn(formData);
      if (response.status === 200) {
        toast.success("Logged in successfully", {
          position: "bottom-right",
        });
      } else if (response.status === 401) {
        toast.error("Invalid credentials");
      }
      console.log(response.data);
      localStorage.setItem("token", response.data.access_token);
      props.login();
    } catch (error) {
      console.error("Login failed", error);
      if (error.response && error.response.status === 401) {
        toast.error("Invalid credentials");
      } else {
        toast.error("Login failed");
      }
    }
  };
  const handleLogout = () => {
    props.logout();
  };
  return (
    <Navbar maxWidth="screen">
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col items-center gap-1 text-xl font-semibold">
                Log In to your account
              </ModalHeader>

              <ModalBody className="flex flex-col gap-4">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />

                {/* 👇 Small Ad Message */}
                <div className="text-sm text-gray-500 italic text-center">
                  ✨ Unlock exclusive travel deals by logging in!
                </div>
              </ModalBody>

              <ModalFooter className="flex justify-end gap-3">
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={onClose}
                  onClick={handleSubmit}
                >
                  Less'go
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <NavbarBrand className="pl-10">
        <p className="font-pacifico text-lg text-pink-600">Ghumne Chalein</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        {props.type === "dashboard" && (
          <NavbarItem isActive>
            <Link
              to="/addTrip"
              className="text-violet-600 hover:text-violet-800 font-medium"
            >
              Add Trip
            </Link>
          </NavbarItem>
        )}
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      {props.type === "dashboard" ? (
        <NavbarContent as="div" justify="end" className="pr-10">
          <DarkModeToggle />
          <p>{props.name}</p>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{props.email}</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">Analytics</DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      ) : (
        <NavbarContent justify="end">
          <DarkModeToggle />
          <NavbarItem className="hidden lg:flex">
            <Button onPress={onOpen} variant="bordered" color="primary">
              Login
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" to="/signup" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}
    </Navbar>
  );
}
