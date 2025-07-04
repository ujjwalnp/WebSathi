import MenuOptions from "@components/navigation/MenuOptions"

const testUser = {
  id: "user_1",
  name: "Rajesh",
  role: "AGENCY_ADMIN",
  agency: {
    id: "agency_1",
    name: "WebSathi Agency",
    address: "Kathmandu",
    agencyLogo: "/agency-logo.png",
  },
  permissions: [],
};

const testSubAccounts = [
  {
    id: "sub_1",
    name: "Client One",
    address: "Bhaktapur",
    subAccountLogo: "/sub-logo.png",
  },
];

const testOptions = [
  {
    id: "opt_1",
    name: "Dashboard",
    icon: "dashboard",
    link: "/dashboard",
  },
  {
    id: "opt_2",
    name: "Settings",
    icon: "settings",
    link: "/settings",
  },
];

export default function TestPage() {
  return (
    <MenuOptions
      id="menu_1"
      defaultOpen={true}
      sideBarLogo="/sidebar-logo.png"
      sideBarOptions={testOptions}
      subAccount={testSubAccounts}
      user={testUser}
      details={testUser.agency}
    />
  );
}
