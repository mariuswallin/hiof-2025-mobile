// app/(zShared)/access.tsx

import CustomView from "@/components/CustomView";
import { Permissions } from "@/components/shared/Permissions";

export default function Access() {
  return (
    <CustomView safeArea className="flex-1">
      <Permissions route="/(admin)/(students)/add" />
    </CustomView>
  );
}
