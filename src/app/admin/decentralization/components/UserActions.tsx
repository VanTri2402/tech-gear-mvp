import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface UserActionsProps {
    user : 
    {id : string , role : string}
}

export function UserActions({user} : UserActionsProps){
    const router = useRouter()
    const [isLoading , setIsLoading] = useState(false)

    const isAdmin = user.role === "ADMIN"
    const handleUpdateRole = async ( ) =>{
        try{
      const res = await fetch(`/api/users/${user.id}`, { method: 'PATCH' });
      if(!res.ok){
        throw new Error('Failed to update user role')
      }
      router.refresh()
    } catch(error) {
        console.error(error)
        alert('An error occurred while updating the role.')
    }finally{
        setIsLoading(false)
    }
}
return (
    <Button 
      onClick={handleUpdateRole} 
      disabled={isAdmin || isLoading} // Disable nếu đã là ADMIN hoặc đang loading
      size="sm"
    >
      {isLoading ? "Updating..." : (isAdmin ? "Already Admin" : "Promote to Admin")}
    </Button>
)

}