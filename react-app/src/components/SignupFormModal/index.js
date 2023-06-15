import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import { useHistory } from "react-router-dom"
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const history = useHistory()
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [businessName, setBusinessName] = useState("")
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState({});
	const [submitted, setSubmitted] = useState(false)
	const { closeModal } = useModal();

	useEffect(() => {
		const errors = {}

		if (username.length < 4) errors["username"] = "❗Please make sure your username is more than 4 characters"
		if (!username.length) errors["username"] = "👋 Username is required"
		if (!firstName.length) errors["firstName"] = "👋 First name is required"
		if (!lastName.length) errors["lastName"] = "👋 Last name is required"
		if (!businessName.length) errors["businessName"] = "👋 Please indicated what business you will be using NotTrello for"
		if (!email.includes('@') || !email.includes('.')) errors["email"] = "❗Please include a valid email"
		if (password !== confirmPassword) errors["password"] = "❗password and confirm password do not match"

		setErrors(errors)
	}, [email, username, firstName, lastName, businessName, password, confirmPassword])

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitted(true)
		if (Object.values(errors).length) return

		if (password === confirmPassword) {
			const formData = new FormData()

			formData.append("email", email)
			formData.append("username", username)
			formData.append("first_name", firstName)
			formData.append("last_name", lastName)
			formData.append("business_name", businessName)
			formData.append("password", password)

			console.log("Form Data gathered from signup form:")
			for (let key of formData.entries()) {
				console.log(key[0] + ' ----> ' + key[1])
			}

			const data = await dispatch(signUp(formData));
			if (data) {
				setErrors(data);
			} else {
				history.push("/boards/current")
				closeModal();
			}
		} else {
			setErrors({
				"password": "❗Confirm Password field must be the same as the Password field",
			});
		}
	};

	return (
		<>
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<ul className="errors">
					{submitted && Object.values(errors).map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<label>
					First Name
					<input
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
					/>
				</label>
				<label>
					Last Name
					<input
						type="text"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
					/>
				</label>
				<label>
					Email
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				<label>
					Username
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				<label>
					Please indicate the name of the business you will be tracking projects for:
					<input
						type="text"
						value={businessName}
						onChange={(e) => setBusinessName(e.target.value)}
						required
					/>
				</label>
				<label>
					Password
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<label>
					Confirm Password
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				<button type="submit">Sign Up</button>
			</form>
		</>
	);
}

export default SignupFormModal;
