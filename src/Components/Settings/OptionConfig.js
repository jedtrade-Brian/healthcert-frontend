export const SettingsConfig = {
  category: "Billing",
  options: [
    {
      title: "Recipient's Email",
      accessor: "RecipientEmail",
      type: 'TextInput',
      inputAdornment: "",
    },
    {
      title: "Issue Unit Price",
      accessor: "UnitPrice",
      type: 'TextInput',
      inputAdornment: "$",
    },
    {
      title: "Revoke Unit Price",
      accessor: "RevokePrice",
      type: 'TextInput',
      inputAdornment: "$",
    },
    {
      title: "Surcharge",
      accessor: "Surcharge",
      type: 'TextInput',
      inputAdornment: "$",
    },
    {
      title: "Monthly Billing",
      accessor: "MonthlyBilling",
      type: 'SliderInput',
      inputAdornment: "",
    },
    {
      title: "Billing Date",
      accessor: "BillingDate",
      type: 'DateInput',
      inputAdornment: "",
    },
  ],
};
