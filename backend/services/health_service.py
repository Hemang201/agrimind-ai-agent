def calculate_health_score(plant: dict):
    score = 100
    reasons = []
    logs = plant.get("logs", [])

    # Watering check
    water_logs = [log for log in logs if log["action"] == "watering"]
    if not water_logs:
        score -= 20
        reasons.append("No watering history found")

    # Diagnosis check
    diagnosis_logs = [log for log in logs if log["action"] == "diagnosis"]
    if diagnosis_logs:
        latest = diagnosis_logs[-1]["data"]
        issue = latest.get("issue", "")
        if issue != "Healthy":
            score -= 30
            reasons.append(f"Issue detected: {issue}")

    # Growth stage impact
    stage = plant.get("growth_stage")
    if stage == "germination":
        score -= 5
    elif stage == "seedling":
        score += 0
    elif stage == "vegetative":
        score += 5
    elif stage == "flowering":
        score += 10
    elif stage == "mature":
        score += 8
    elif stage == "harvest":
        score += 3

    score = max(0, min(score, 100))
    if score > 80:
        status = "Healthy"
    elif score > 50:
        status = "Moderate"
    else:
        status = "Needs Attention"

    return {
        "score": score,
        "health_score": score,
        "status": status,
        "reasons": reasons
    }