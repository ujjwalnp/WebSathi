// apps/web/app/page.tsx
import LaunchPadPage from "../components/launch_pad/LaunchPadPage";

export default function Home() {
  return <LaunchPadPage params={{ agencyId: "your_agency_id" }} searchParams={{ code: undefined }} />;
}
