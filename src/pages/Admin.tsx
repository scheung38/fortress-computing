
import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Search, User, Check, X, UserCheck, UserX, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogTrigger 
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  linkedin_url: string | null;
  created_at: string;
};

type Role = {
  user_id: string;
  role: 'admin' | 'member';
};

type UserWithRoles = Profile & {
  roles: string[];
};

const Admin = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<UserWithRoles[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserWithRoles | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [editName, setEditName] = useState('');
  const [editLinkedinUrl, setEditLinkedinUrl] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // Fetch all profiles
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Fetch all user roles
      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) throw rolesError;
      
      // Map roles to users
      const usersWithRoles = profiles.map((profile: Profile) => {
        const userRoles = roles
          .filter((role: Role) => role.user_id === profile.id)
          .map((role: Role) => role.role);
        
        return {
          ...profile,
          roles: userRoles,
        };
      });
      
      setUsers(usersWithRoles);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error fetching users",
        description: "There was an error loading user data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (user: UserWithRoles) => {
    setSelectedUser(user);
    setEditName(user.full_name || '');
    setEditLinkedinUrl(user.linkedin_url || '');
    setIsEditDialogOpen(true);
  };

  const handleRoleClick = (user: UserWithRoles) => {
    setSelectedUser(user);
    setIsAdmin(user.roles.includes('admin'));
    setIsMember(user.roles.includes('member'));
    setIsRoleDialogOpen(true);
  };

  const handleDeleteClick = (user: UserWithRoles) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const handleUpdateUser = async () => {
    if (!selectedUser) return;
    
    setProcessing(true);
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: editName,
          linkedin_url: editLinkedinUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', selectedUser.id);

      if (error) throw error;
      
      toast({
        title: "User updated",
        description: "User information has been updated successfully.",
      });
      
      // Update local state
      setUsers(users.map(user => 
        user.id === selectedUser.id 
          ? { ...user, full_name: editName, linkedin_url: editLinkedinUrl } 
          : user
      ));
      
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error('Error updating user:', error);
      toast({
        title: "Update failed",
        description: "There was an error updating the user.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleUpdateRoles = async () => {
    if (!selectedUser) return;
    
    setProcessing(true);
    
    try {
      // First delete all existing roles
      const { error: deleteError } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', selectedUser.id);

      if (deleteError) throw deleteError;
      
      // Add selected roles
      const rolesToAdd = [];
      if (isAdmin) rolesToAdd.push({ user_id: selectedUser.id, role: 'admin' });
      if (isMember) rolesToAdd.push({ user_id: selectedUser.id, role: 'member' });
      
      if (rolesToAdd.length > 0) {
        const { error: insertError } = await supabase
          .from('user_roles')
          .insert(rolesToAdd);

        if (insertError) throw insertError;
      }
      
      toast({
        title: "Roles updated",
        description: "User roles have been updated successfully.",
      });
      
      // Update local state
      setUsers(users.map(user => 
        user.id === selectedUser.id 
          ? { ...user, roles: [...(isAdmin ? ['admin'] : []), ...(isMember ? ['member'] : [])] } 
          : user
      ));
      
      setIsRoleDialogOpen(false);
    } catch (error) {
      console.error('Error updating user roles:', error);
      toast({
        title: "Role update failed",
        description: "There was an error updating user roles.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser || selectedUser.id === user?.id) return;
    
    setProcessing(true);
    
    try {
      // The auth.users entry will be deleted by Supabase,
      // and with cascade delete, this will also remove the profile
      const { error } = await supabase.auth.admin.deleteUser(
        selectedUser.id
      );

      if (error) throw error;
      
      toast({
        title: "User deleted",
        description: "User has been deleted successfully.",
      });
      
      // Update local state
      setUsers(users.filter(user => user.id !== selectedUser.id));
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        title: "Delete failed",
        description: "There was an error deleting the user.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const filteredUsers = users.filter(user => {
    const searchLower = searchQuery.toLowerCase();
    const emailMatch = user.email.toLowerCase().includes(searchLower);
    const nameMatch = user.full_name?.toLowerCase().includes(searchLower);
    
    return emailMatch || (nameMatch || false);
  });

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex justify-center">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-fortress-navy">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold mb-8 text-fortress-light">Admin Dashboard</h1>
        
        <Card className="bg-card/50 backdrop-blur-sm border-primary/20 mb-8">
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>
              Manage all users registered to the platform
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search users by email or name..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Roles</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        No users found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map(user => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              {user.avatar_url ? (
                                <AvatarImage src={user.avatar_url} alt={user.full_name || ''} />
                              ) : (
                                <AvatarFallback className="bg-secondary text-xs">
                                  {user.full_name ? user.full_name.charAt(0).toUpperCase() : <User size={14} />}
                                </AvatarFallback>
                              )}
                            </Avatar>
                            <div className="font-medium">
                              {user.full_name || 'No Name'}
                              {user.id === user?.id && (
                                <span className="ml-2 inline-block bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-full">You</span>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {user.roles.includes('admin') ? (
                              <span className="inline-block bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-full">
                                Admin
                              </span>
                            ) : null}
                            {user.roles.includes('member') ? (
                              <span className="inline-block bg-blue-500/20 text-blue-500 text-xs px-2 py-0.5 rounded-full">
                                Member
                              </span>
                            ) : null}
                            {user.roles.length === 0 ? (
                              <span className="inline-block bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded-full">
                                Guest
                              </span>
                            ) : null}
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(user.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditClick(user)}
                              className="h-8 w-8 p-0"
                            >
                              <Edit size={16} />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRoleClick(user)}
                              className="h-8 w-8 p-0"
                            >
                              {user.roles.length > 0 ? <UserCheck size={16} /> : <UserX size={16} />}
                            </Button>
                            {user.id !== user?.id && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteClick(user)}
                                className="h-8 w-8 p-0 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                              >
                                <Trash2 size={16} />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Edit User Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  value={selectedUser?.email || ''}
                  disabled
                  className="bg-secondary/20"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Full Name</Label>
                <Input
                  id="edit-name"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-linkedin">LinkedIn URL</Label>
                <Input
                  id="edit-linkedin"
                  value={editLinkedinUrl}
                  onChange={(e) => setEditLinkedinUrl(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleUpdateUser} 
                disabled={processing}
              >
                {processing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : "Save Changes"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Manage Roles Dialog */}
        <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Manage User Roles</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <div className="mb-5">
                <div className="flex items-center space-x-3 py-2">
                  <Checkbox
                    id="admin-role"
                    checked={isAdmin}
                    onCheckedChange={(checked) => setIsAdmin(checked as boolean)}
                  />
                  <Label htmlFor="admin-role" className="font-medium cursor-pointer">
                    Admin Role
                  </Label>
                </div>
                <p className="text-sm text-muted-foreground ml-7">
                  Full access to manage users and platform settings
                </p>
              </div>
              
              <div>
                <div className="flex items-center space-x-3 py-2">
                  <Checkbox
                    id="member-role"
                    checked={isMember}
                    onCheckedChange={(checked) => setIsMember(checked as boolean)}
                  />
                  <Label htmlFor="member-role" className="font-medium cursor-pointer">
                    Member Role
                  </Label>
                </div>
                <p className="text-sm text-muted-foreground ml-7">
                  Regular user with access to member-only features
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsRoleDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleUpdateRoles} 
                disabled={processing}
              >
                {processing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : "Save Roles"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete User Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete User</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="mb-2">
                Are you sure you want to delete this user?
              </p>
              <div className="p-4 bg-destructive/10 rounded-md border border-destructive text-destructive">
                <p><strong>Email:</strong> {selectedUser?.email}</p>
                <p><strong>Name:</strong> {selectedUser?.full_name || 'No Name'}</p>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                This action cannot be undone. This will permanently delete the user account
                and remove their data from our servers.
              </p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                variant="destructive"
                onClick={handleDeleteUser} 
                disabled={processing}
              >
                {processing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : "Delete User"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Admin;
