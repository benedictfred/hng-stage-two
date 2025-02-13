import { useState, useEffect, useRef } from "react";
import { resizeImage } from "../utils/helpers";

function AttendeeDetails({ setStep }) {
  const [formData, setFormData] = useState(
    () =>
      JSON.parse(localStorage.getItem("attendeeForm")) || {
        fullName: "",
        email: "",
        request: "",
        avatarUrl: "",
      }
  );

  const [errors, setErrors] = useState({});
  const [isHovering, setIsHovering] = useState(false);
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("attendeeForm", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (file) => {
    if (!file) return;

    const resizedImage = await resizeImage(file);

    const formData = new FormData();
    formData.append("file", resizedImage, file.name);
    formData.append("upload_preset", "hng-task");

    try {
      setIsLoading(true);
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dwedz2laa/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();

      if (data.secure_url) {
        setFormData((prev) => ({ ...prev, avatarUrl: data.secure_url }));
      }
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      handleImageUpload(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.avatarUrl.trim())
      newErrors.avatar = "Profile picture is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    console.log("Submitting:", formData);
    setStep(3);
  };

  return (
    <div className="border border-[#0E464F] rounded-4xl p-5 mt-5 font-roboto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="border border-[#07373F] bg-[#052228] p-5 rounded-lg">
          <p>Upload Profile Photo</p>
          <div className="flex justify-center items-center bg-[#04292e] mt-4">
            <div
              className="relative flex flex-col justify-center items-center border-4 border-[#24A0B5] p-4 w-1/2 rounded-4xl h-56 bg-[#24A0B5]/30 cursor-pointer overflow-hidden max-sm:w-[90%]"
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*"
                className="hidden"
              />
              {formData.avatarUrl ? (
                <>
                  <img
                    src={formData.avatarUrl}
                    alt="Avatar"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                  :
                  {isHovering && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white transition-all duration-200">
                      <img
                        src="/cloud-download.svg"
                        alt="cloud-download-icon"
                      />
                      <p className="text-sm text-center">
                        Drag & drop or click to upload
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <img src="/cloud-download.svg" alt="cloud-download-icon" />
                  <p className="text-sm text-white text-center">
                    Drag & drop or click to upload
                  </p>
                </>
              )}
            </div>
          </div>
          {errors.avatar && (
            <p className="text-red-500 text-xs mt-1">{errors.avatar}</p>
          )}
          {isLoading && <p className="text-center">Loading...</p>}
        </div>

        <div className="bg-[#07373F] h-1 w-full mt-5"></div>

        <div className="flex flex-col">
          <label htmlFor="fullName" className="text-sm">
            Enter your name
          </label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="border border-[#07373F] p-2 rounded-lg outline-none"
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs">{errors.fullName}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm">
            Enter your email*
          </label>
          <div className="relative w-full">
            <img
              src="/envelope.svg"
              alt="email"
              className="absolute top-2 left-1"
            />
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-[#07373F] p-2 pl-10 rounded-lg w-full outline-none"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="request" className="text-sm">
            Special Request
          </label>
          <textarea
            name="request"
            id="request"
            rows="3"
            value={formData.request}
            onChange={handleChange}
            className="border border-[#07373F] p-2 rounded-lg outline-none resize-none"
          ></textarea>
        </div>

        <div className="flex space-x-5 justify-center items-center mt-5 font-jejumyeongjo max-sm:space-x-0 max-sm:flex-col-reverse">
          <button
            type="button"
            className="border border-[#24A0B5] text-[#24A0B5] py-3 rounded-xl w-full cursor-pointer"
            onClick={() => setStep(1)}
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-[#24A0B5] py-3 rounded-xl w-full cursor-pointer max-sm:mb-4"
          >
            Get My Free Ticket
          </button>
        </div>
      </form>
    </div>
  );
}

export default AttendeeDetails;
