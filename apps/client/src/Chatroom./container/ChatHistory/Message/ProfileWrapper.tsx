import React from "react";

export function ProfileWrapper({ profile }: { profile?: string }) {
  if (!profile) {
    return <div className="p-[2px] w-10" />;
  }

  return (
    <div className="p-[2px]">
      <img src={profile} alt="profile" className="w-9 h-9 rounded-lg" />
    </div>
  );
}
