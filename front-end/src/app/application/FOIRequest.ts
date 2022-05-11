export class ApplicationForm {

    constructor (

    public TotalLoanAmount: string,
    // total loan amount in EGP
    public LoanTenure: string,
    // total loan tenure in months
    public FirstName: string,
    /// first name
    public LastName: string,
    /// last name
    public Email: string,
    /// email
    public Mobile: string,
    /// mobile
    public NationalID: string,
    /// national ID or Passport Number
    public Nationality: string,
    /// nationality
    public dob: string,
    /// date of birth
    public PreferredBranch: string,
    /// form of access specify
    public MonthlyIncome: string,
    /// currency specified in monthly income
    public MonthlyIncomeCurrency: string,
    /// request free text
    public EmploymentType: string,
    /// employment type (self-employed etc)
    public ExistingCustomer: string,
    /// existing customer status
    public Comments: string,
    /// additional comments
    public DateOfRequest: string,
    )
    {}
}
