export function generateSimulation(data) {
    return {
        temperature_rise: (data.carbon_score * 0.03).toFixed(2),
        ice_level: data.carbon_score > 70 ? "melting" : "stable",
        forest_density: 100 - data.carbon_score,
        pollution_level: data.carbon_score,
        visual_state: data.carbon_score > 70 ? "high_pollution" : "healthy"
    };
}