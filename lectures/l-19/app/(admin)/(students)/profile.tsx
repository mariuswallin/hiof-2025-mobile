// app/(admin)/(students)/profile.tsx

import CustomView from "@/components/CustomView";
import User from "@/components/User";

export default function AdminProfile() {
  return (
    <CustomView safeArea className="flex-1">
      <User />
    </CustomView>
  );
}
