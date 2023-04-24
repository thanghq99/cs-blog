import useNewsList from "@/src/hooks/useNewsList";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Button from "../../sharedComponents/Button";
import { toast } from "react-toastify";

const ActionIcon = ({ toggleButtonRef, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-10 h-7  hover:cursor-pointer hover:bg-red-500"
      ref={toggleButtonRef}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
      />
    </svg>
  );
};

const TableAction = ({ news, page, pageSize }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const toggleButtonRef = useRef();
  const menuActionsRef = useRef();
  const { mutate } = useNewsList(page, pageSize);

  const id = news._id.toString();

  const closeMenu = () => setOpen(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuActionsRef.current &&
        !menuActionsRef.current.contains(event.target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(event.target)
      ) {
        console.log("click somewhere");
        closeMenu();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuActionsRef]);
  const toggleOpen = () => setOpen((open) => !open);

  const togglePublish = async (news) => {
    try {
      const newPublishState = !news.publishable;
      const fetchResponse = await fetch(`/api/news/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ publishable: newPublishState }),
      });
      const fetchData = await fetchResponse.json();
      mutate();
      closeMenu();
      if (fetchData.success === false) toast.error("An error occurs");
      else toast.success("Publishing status is updated");
    } catch (error) {
      console.log(error);
      toast.error("An error occurs");
    }
  };

  const handleEdit = () => {
    router.push(`/dashboard/news/${id}/edit`);
  };
  const handleRemove = async () => {
    try {
      const fetchResponse = await fetch(`/api/news/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const fetchData = await fetchResponse.json();
      mutate();
      closeMenu();
      if (fetchData.success === false) toast.error("An error occurs");
      else toast.success("News post has been removed");
    } catch (error) {}
  };

  return (
    <div className="relative flex justify-center">
      <ActionIcon toggleButtonRef={toggleButtonRef} onClick={toggleOpen} />
      {open ? (
        <div
          ref={menuActionsRef}
          className={`flex absolute top-8 min-w-[60px] bg-slate-600 flex-col z-10`}
        >
          <Button
            title={news.publishable ? "Unpublish" : "Publish"}
            widthFull
            action={() => togglePublish(news)}
          />
          <Button title="Edit" widthFull action={handleEdit} />
          <Button title="Remove" widthFull action={handleRemove} />
        </div>
      ) : null}
    </div>
  );
};

export default TableAction;
