import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";

const AppliedTutorOpportunities = ({ applications = [] }) => {
  console.log("AppliedJob applications prop:", applications);
  console.log("Applications length:", applications.length);
  console.log(
    "Applications data:",
    applications.map(app => ({
      id: app._id,
      title: app.tutorOpportunity?.title,
      company: app.tutorOpportunity?.tutionCenter?.name,
      status: app.status,
      date: app.createdAt,
    })),
  );

  return (
    <div>
      <Table>
        <TableCaption>Recent Applied Tutor Opportunities</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Tution Center</TableHead>
            <TableHead className="text-right">Status</TableHead>
            <TableHead>Applied Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                You have not applied to any tutor opportunities yet.
              </TableCell>
            </TableRow>
          ) : (
            applications.map(appliedJob => (
              <TableRow key={appliedJob._id}>
                <TableCell>{appliedJob.tutorOpportunity?.title}</TableCell>
                <TableCell>
                  {appliedJob.tutorOpportunity?.tutionCenter?.name}
                </TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`$
                      appliedJob?.status === "rejected"
                        ? "bg-red-500"
                        : appliedJob?.status === "accepted"
                        ? "bg-green-600"
                        : "bg-gray-500"
                    }`}>
                    {" "}
                    {appliedJob?.status}
                  </Badge>{" "}
                </TableCell>
                <TableCell>
                  {new Date(appliedJob.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedTutorOpportunities;

AppliedTutorOpportunities.propTypes = {
  applications: PropTypes.array,
};
