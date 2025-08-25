"use client";
import AddCustomPolicy from "@/components/forms/AddCustomPolicy";
import Breadcrumbs from "@/components/UI/Breadcrumbs";
import PolicyCard from "@/components/UI/cards/PolicyCard";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

const labels = {
  "/leaves": "Leaves",
};

function LeaveSettingsPage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [policies, setPolicies] = useState([
    {
      id: "1",
      title: "Annual Leave",
      policyType: "Custom Policy",
      enabled: true,
    },
    { id: "2", title: "Maternity", policyType: "Custom Policy", enabled: true },
    {
      id: "3",
      title: "Sick Leave",
      policyType: "Custom Policy",
      enabled: false,
    },
    { id: "4", title: "Paternity", policyType: "Custom Policy", enabled: true },
    {
      id: "5",
      title: "Hospitalisation",
      policyType: "Custom Policy",
      enabled: false,
    },
    { id: "6", title: "LOP", policyType: "Custom Policy", enabled: true },
  ]);

  const handleEditPolicy = (id: string) => {
    console.log("Edit policy with id:", id);
    // In a real application, this would open a modal or navigate to edit page
  };

  const handleTogglePolicy = (id: string, enabled: boolean) => {
    setPolicies(
      policies.map((policy) =>
        policy.id === id ? { ...policy, enabled } : policy,
      ),
    );
  };

  return (
    <div>
      <h2 className="mt-4 text-xl font-bold">Leaves</h2>
      <div className="mb-6 flex flex-col justify-between lg:flex-row">
        <Breadcrumbs labels={labels} homeLabel="Home" />
        <div className="mt-4 flex flex-wrap items-center gap-3 lg:mt-0">
          <button
            onClick={() => setIsOpen(true)}
            className="hover:bg-main/90 flex items-center gap-1 rounded-lg bg-main px-3 py-2.5 text-xs text-white"
          >
            <PlusCircle size={14} /> Add Custom Policy
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {policies.map((policy) => (
          <PolicyCard
            key={policy.id}
            title={policy.title}
            policyType={policy.policyType}
            onEdit={() => handleEditPolicy(policy.id)}
            enabled={policy.enabled}
            onToggle={(enabled) => handleTogglePolicy(policy.id, enabled)}
          />
        ))}
      </div>

      {/* Modal for adding new policy (simplified) */}
      <AddCustomPolicy isOpen={isOpen} setIsOpen={setIsOpen} variant="modal" />
    </div>
  );
}

export default LeaveSettingsPage;
