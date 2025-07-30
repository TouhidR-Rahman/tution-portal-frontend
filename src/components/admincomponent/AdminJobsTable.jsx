import { useEffect, useState } from "react";
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
import { Eye, MoreHorizontal, Trash2, Edit } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TUTOR_OPPORTUNITY_API_ENDPOINT } from "@/utils/data";

const AdminTutorOpportunitiesTable = () => {
  const { allTutorOpportunities = [], searchTutorOpportunityByText } =
    useSelector(store => store.tutorOpportunities);
  const navigate = useNavigate();
  // Delete job handler
  const handleDeleteJob = async jobId => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      const res = await fetch(`${TUTOR_OPPORTUNITY_API_ENDPOINT}/${jobId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        setFilterJobs(prev => prev.filter(j => j._id !== jobId));
      } else {
        alert("Failed to delete job.");
      }
    } catch {
      alert("Error deleting job.");
    }
  };

  const [filterJobs, setFilterJobs] = useState([]);

  useEffect(() => {
    if (!Array.isArray(allTutorOpportunities)) {
      if (filterJobs.length !== 0) setFilterJobs([]);
      return;
    }
    const filteredJobs = allTutorOpportunities.filter(job => {
      if (!searchTutorOpportunityByText) return true;
      return (
        job.title
          ?.toLowerCase()
          .includes(searchTutorOpportunityByText.toLowerCase()) ||
        job?.tutionCenter?.name
          ?.toLowerCase()
          .includes(searchTutorOpportunityByText.toLowerCase())
      );
    });
    // Only update state if the filtered jobs have changed
    if (
      filteredJobs.length !== filterJobs.length ||
      !filteredJobs.every((job, i) => job === filterJobs[i])
    ) {
      setFilterJobs(filteredJobs);
    }
  }, [allTutorOpportunities, searchTutorOpportunityByText, filterJobs]);

  if (!allTutorOpportunities) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption>Your recent Posted Tutor Opportunities</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="min-w-[200px] font-semibold text-gray-900">
              🏢 Tuition Center Name
            </TableHead>
            <TableHead className="min-w-[150px] font-semibold text-gray-900">
              👤 Role
            </TableHead>
            <TableHead className="min-w-[120px] font-semibold text-gray-900">
              📅 Date
            </TableHead>
            <TableHead className="text-right min-w-[100px] font-semibold text-gray-900">
              ⚙️ Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan="4" className="text-center py-12">
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
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6.286M16 6H8V4h8v2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No Tutor Opportunities
                  </h3>
                  <p className="text-gray-600">
                    You haven&apos;t posted any tutor opportunities yet.
                  </p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            filterJobs?.map(job => (
              <TableRow
                key={job._id}
                className="hover:bg-gray-50 transition-colors">
                <TableCell className="font-medium text-gray-900">
                  {job?.tutionCenter?.name || (
                    <span className="text-gray-500 italic">
                      No Tuition Center
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-gray-700">{job.title}</TableCell>
                <TableCell className="text-gray-700">
                  {job.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreHorizontal className="h-4 w-4" />
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-2">
                      <div
                        onClick={() =>
                          navigate(
                            `/admin/tutor-opportunities/${job._id}/applicants`,
                          )
                        }
                        className="flex items-center gap-2 w-full cursor-pointer p-2 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-600">
                          View Applicants
                        </span>
                      </div>
                      <div
                        onClick={() => navigate(`/admin/jobs/edit/${job._id}`)}
                        className="flex items-center gap-2 w-full cursor-pointer p-2 hover:bg-green-50 rounded-lg transition-colors">
                        <Edit className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-600">
                          Edit
                        </span>
                      </div>
                      <div
                        onClick={() => handleDeleteJob(job._id)}
                        className="flex items-center gap-2 w-full cursor-pointer p-2 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4 text-red-600" />
                        <span className="text-sm font-medium text-red-600">
                          Delete
                        </span>
                      </div>
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

export default AdminTutorOpportunitiesTable;
