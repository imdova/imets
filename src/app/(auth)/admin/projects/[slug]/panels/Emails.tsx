import ConnectAccount from "@/components/forms/ConnectAccount";
import React, { useState } from "react";

const Emails: React.FC = () => {
  const [isAddACC, setIsAddACC] = useState<boolean>(false);
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-gray-800">Emails</h1>
      <div className="mb-6 flex flex-col justify-between gap-2 rounded-lg border border-gray-200 p-3 shadow-sm md:flex-row md:items-center">
        <div>
          <h2 className="font-medium text-gray-700">Manage Emails</h2>
          <p className="text-sm text-gray-600">
            You can send and reply to emails directly via this section.
          </p>
        </div>
        <button
          onClick={() => setIsAddACC(true)}
          className="rounded bg-secondary px-3 py-2 text-white transition-colors hover:bg-black"
        >
          Connect Account
        </button>
      </div>
      <ConnectAccount
        isOpen={isAddACC}
        setIsOpen={setIsAddACC}
        variant="modal"
      />
    </div>
  );
};

export default Emails;
