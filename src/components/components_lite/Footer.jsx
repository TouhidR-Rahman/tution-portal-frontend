import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-gray-800 text-white py-6">
      <div className="text-center">
        <p className="text-sm">
          © 2025 TutorConnect Bangladesh. All rights reserved.
        </p>
        <p className="text-sm mt-2">
          The leading platform for connecting tutors and tution centers in
          Bangladesh.
        </p>
        <p className="text-sm mt-2">
          <Link to={"/PrivacyPolicy"} className="text-blue-400 hover:underline">
            Privacy Policy
          </Link>{" "}
          |{" "}
          <Link
            to={"/TermsofService"}
            className="text-blue-400 hover:underline">
            Terms of Service
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Footer;
