export class ApplicationForm {

    constructor (
    /// Title / salutation
    public Title: string,
    /// first name
    public FirstName: string,
    /// middle name
    public MiddleName: string,
    /// last name
    public LastName: string,
    /// building name
    public BuildingName: string,
    /// street number
    public Number: string,
    /// street name
    public Street: string,
    /// town or Dublin district
    public Town: string,
    /// County
    public County: string,
    /// EIRCode
    public EIRCode: string,
    /// email
    public Email: string,
    /// home phone
    public HomePhone: string,
    /// business phone
    public BusinessPhone: string,
    /// mobile
    public Mobile: string,
    /// type of record personal / non-personal
    public TypeOfRecord: string,
    /// form of access requested post / other
    public FormOfAccessChoice: string,
    /// form of access specify
    public FormOfAccessSpecify: string,
    /// request free text
    public RequestText: string,
    /// date of request
    public DateOfRequest: string,
    )
    {}
}