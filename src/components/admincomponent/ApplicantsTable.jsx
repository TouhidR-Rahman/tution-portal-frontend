import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "@/utils/data";
import { useNavigate } from "react-router-dom";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector(store => store.application);
  const navigate = useNavigate();

  const statusHandler = async (status, id) => {
    console.log("called");
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_ENDPOINT}/status/${id}/update`,
        { status },
      );
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption>List of applicants for this opportunity</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="min-w-[150px] font-semibold text-gray-900">
              👤 Full Name
            </TableHead>
            <TableHead className="min-w-[200px] font-semibold text-gray-900">
              📧 Email
            </TableHead>
            <TableHead className="min-w-[120px] font-semibold text-gray-900">
              📱 Contact
            </TableHead>
            <TableHead className="min-w-[100px] font-semibold text-gray-900">
              📄 Resume
            </TableHead>
            <TableHead className="min-w-[100px] font-semibold text-gray-900">
              📅 Date
            </TableHead>
            <TableHead className="min-w-[100px] font-semibold text-gray-900">
              🔍 Profile
            </TableHead>
            <TableHead className="text-right min-w-[100px] font-semibold text-gray-900">
              ⚙️ Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!applicants ||
          !applicants?.applications ||
          applicants?.applications?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No Applications Yet
                  </h3>
                  <p className="text-gray-600">
                    No one has applied for this opportunity yet.
                  </p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            applicants?.applications?.map(item => (
              <TableRow
                key={item._id}
                className="hover:bg-gray-50 transition-colors">
                <TableCell className="font-medium text-gray-900">
                  {item?.applicant?.fullname}
                </TableCell>
                <TableCell className="text-gray-700">
                  {item?.applicant?.email}
                </TableCell>
                <TableCell className="text-gray-700">
                  {item?.applicant?.phoneNumber}
                </TableCell>
                <TableCell>
                  {item.applicant?.profile?.resume ? (
                    <a
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer">
                      📄 Download
                    </a>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-500">
                      N/A
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-gray-700">
                  {item?.applicant?.createdAt.split("T")[0]}
                </TableCell>
                <TableCell>
                  <button
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors"
                    onClick={() =>
                      navigate(`/profile/${item?.applicant?._id}`)
                    }>
                    👁️ View Profile
                  </button>
                </TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreHorizontal className="h-4 w-4" />
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-2">
                      {shortlistingStatus.map(status => (
                        <div
                          key={status}
                          onClick={() => statusHandler(status, item._id)}
                          className={`cursor-pointer p-2 rounded-lg transition-colors font-medium text-sm ${
                            status === "Accepted"
                              ? "hover:bg-green-50 text-green-600"
                              : "hover:bg-red-50 text-red-600"
                          }`}>
                          {status === "Accepted" ? "✅ Accept" : "❌ Reject"}
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
