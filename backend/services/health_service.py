def calculate_health_score(plant: dict):
    score = 100
    reasons = []
    logs = plant.get("logs", [])
    # Check last watering
    water_logs = [log for log in logs if log["action"] == "watering"]

    if not water_logs:
        score -= 20
        reasons.append("No watering history found")

    # Check diagnosis logs
    diagnosis_logs = [log for log in logs if log["action"] == "diagnosis"]
    if diagnosis_logs:
        latest = diagnosis_logs[-1]["data"]
        issue = latest.get("issue", "")
        if issue != "Healthy":
            score -= 30
            reasons.append(f"Issue detected: {issue}")

    # Growth stage impact
    stage = plant.get("growth_stage")
    if stage == "seed":
        score -= 5
    elif stage == "vegetative":
        score += 5
    elif stage == "flowering":
        score += 10
    score = max(0, min(score, 100))
    return {
        "health_score": score,
        "reasons": reasons
    }