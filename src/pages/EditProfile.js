import ProfileForm from "../components/forms/ProfileForm";
import UserEditForm from "../components/forms/UserEditForm";
import VisibilityEditForm from "../components/forms/VisibilityEditForm";

function EditProfile() {
  return (
    <div>
      <UserEditForm />
      <ProfileForm isEditForm={true} />
      <VisibilityEditForm />
    </div>
  );
}

export default EditProfile;
