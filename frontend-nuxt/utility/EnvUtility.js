export const EnvUtility = {
  getSummaryFromData: (formData) => {
    let summary = "";
    formData.forEach(envData => {
      let contents = "";
      Object.keys(envData).forEach((key) => {
        contents = contents + envData[key] + ","
      })
      summary = summary + contents
    })
    return summary
  }
}
