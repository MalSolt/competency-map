import { Role, UserId } from "@kernel";
import { useUpdateUserRole } from "controllers/users";
import { useCallback } from "react"


export const useChangeRole = () => {
  const updateRoleMutation = useUpdateUserRole();

  const handleChange = useCallback((userId: UserId, value: Role) => { 
    updateRoleMutation.mutate({ 
      userId,
      updateUserRoleBodyDto: { role: value },
    })
  }, [updateRoleMutation])

  return {
    setRole: handleChange,
  }
}