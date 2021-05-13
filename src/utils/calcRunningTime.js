export default function calcRunningTime(runningTime_ms){
	const runningTime_min = Math.ceil(runningTime_ms/1000/60);
	const runningTime = runningTime_min > 60 ? (Math.floor(runningTime_min/60)).toString() + " hr " + (runningTime_min%60).toString() + " min" : runningTime_min.toString() + " min"
    return runningTime;
}