import Swal from 'sweetalert2';

export const showAlert = (title: string, text: string, icon: "success" | "error" | "info" | "warning") => {
  Swal.fire({
    title,
    text,
    icon,
    showConfirmButton: false,
    timer: 1500
  });
};
