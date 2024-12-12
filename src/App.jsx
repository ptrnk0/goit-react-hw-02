import Description from "./components/description/Description";
import Options from "./components/options/Options";
import Feedback from "./components/feedback/Feddback";
import Notification from "./components/notification/Notification";
import { useEffect, useState } from "react";

const App = () => {
	const [feedback, setFeedback] = useState(() => {
		const savedFeedback = window.localStorage.getItem("feedback");

		if (savedFeedback) {
			return JSON.parse(savedFeedback);
		}

		return {
			good: 0,
			neutral: 0,
			bad: 0,
		};
	});

	useEffect(() => {
		window.localStorage.setItem("feedback", JSON.stringify(feedback));
	}, [feedback]);

	const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
	const positiveFeedback = Math.round((feedback.good / totalFeedback) * 100);

	const updateFeedback = (feedbackType) => {
		if (feedbackType === "reset") {
			setFeedback({
				good: 0,
				neutral: 0,
				bad: 0,
			});
			return;
		}
		return setFeedback({
			...feedback,
			[feedbackType]: feedback[feedbackType] + 1,
		});
	};

	return (
		<main>
			<section>
				<Description />
				<Options
					onUpdate={updateFeedback}
					totalFeedback={totalFeedback}
				/>
				{totalFeedback ? (
					<Feedback
						feedback={feedback}
						totalFeedback={totalFeedback}
						positiveFeedback={positiveFeedback}
					/>
				) : (
					<Notification />
				)}
			</section>
		</main>
	);
};

export default App;
