const dialog = document.getElementById("delete-dialog");
const form = document.getElementById("delete-form");
const cancelBtn = document.getElementById("cancel-delete");

const toast = document.getElementById("toast");
const closeBtn = document.getElementById("toast-close");

/* =========================
   TOAST
========================= */

if (toast) {
  requestAnimationFrame(() => {
    toast.classList.remove("translate-x-full", "opacity-0");
  });

  function hideToast() {
    toast.classList.add("translate-x-full", "opacity-0");

    setTimeout(() => {
      toast.remove();
    }, 300);
  }

  const timeout = setTimeout(hideToast, 5000);

  closeBtn?.addEventListener("click", () => {
    clearTimeout(timeout);
    hideToast();
  });
}

/* =========================
   DELETE MODAL
========================= */

function openDeleteDialog(id) {
  if (!dialog || !form) return;

  form.action = `/messages/${id}?_method=DELETE`;
  dialog.showModal();
}

function closeDeleteDialog() {
  dialog?.close();
}

cancelBtn?.addEventListener("click", closeDeleteDialog);

dialog?.addEventListener("click", (e) => {
  const rect = dialog.getBoundingClientRect();

  const isOutside =
    e.clientX < rect.left ||
    e.clientX > rect.right ||
    e.clientY < rect.top ||
    e.clientY > rect.bottom;

  if (isOutside) closeDeleteDialog();
});
