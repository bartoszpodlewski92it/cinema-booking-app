import { useState, useEffect } from "react";

interface CheckoutFormProps {
  onSubmit: (formData: { name: string; email: string }) => void;
}

export function CheckoutForm({ onSubmit }: CheckoutFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    if (name === "") return setNameError("");
    
    if (name.trim().length < 3) {
      setNameError("Full name must be at least 3 characters long.");
    } else if (!/^[a-zA-ZĄĆĘŁŃÓŚŹŻąćęłńóśźż]+\s[a-zA-ZĄĆĘŁŃÓŚŹŻąćęłńóśźż]+$/.test(name.trim())) {
      setNameError("Please enter both your first and last name (letters only).");
    } else {
      setNameError("");
    }
  }, [name]);

  useEffect(() => {
    if (email === "") return setEmailError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address (e.g., name@example.com).");
    } else {
      setEmailError("");
    }
  }, [email]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameError || emailError || !name || !email) return;
    
    onSubmit({ 
      name: name.trim(), 
      email: email.trim() 
    });
  };

  const isFormInvalid = !!nameError || !!emailError || !name || !email;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jan Kowalski"
          className={`w-full bg-slate-950 border rounded-lg py-2.5 px-4 text-white placeholder-gray-600 focus:outline-none transition-colors text-sm ${
            nameError ? "border-red-500 focus:border-red-500" : "border-slate-800 focus:border-blue-500"
          }`}
        />
        {nameError && <p className="text-red-500 text-xs mt-1 animate-fade-in">{nameError}</p>}
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jan.kowalski@example.com"
          className={`w-full bg-slate-950 border rounded-lg py-2.5 px-4 text-white placeholder-gray-600 focus:outline-none transition-colors text-sm ${
            emailError ? "border-red-500 focus:border-red-500" : "border-slate-800 focus:border-blue-500"
          }`}
        />
        {emailError && <p className="text-red-500 text-xs mt-1 animate-fade-in">{emailError}</p>}
      </div>

      <button
        type="submit"
        disabled={isFormInvalid}
        className={`w-full font-bold py-3 rounded-lg shadow-lg transition-all mt-2 text-sm ${
          isFormInvalid
            ? "bg-slate-800 text-gray-500 cursor-not-allowed shadow-none"
            : "bg-blue-600 hover:bg-blue-500 text-white"
        }`}
      >
        Confirm & Pay
      </button>
    </form>
  );
}
