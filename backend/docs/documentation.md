# COVID-19 DB API Documentation

API: https://api.covid19db.net

Postman collection: https://documenter.getpostman.com/view/12799044/TVKJxuP4

## Country Endpoints

### GET

Retrieve all instances of countries.

- `/countries`


Retrieve a country instance. See the `identifier` parameter.

- `/countries/:identifier`

### Parameters

#### Query parameters

- `attributes`
    - **Query parameter**
    - **NOT REQUIRED**
    - Specifies which attributes of the country instance(s) to include in the response.
    - Separate multiple desired attributes by commas.
    - If omitted, all fields are included.
    - The `name` and `codes` attributes are always included in the response.
    - Options
        - `name` - Country name
        - `codes` - ISO alpha codes
        - `callingCodes` - Phone calling codes
        - `capital` - Information about the country's capital
        - `alternateNames` - The country's alternate names
        - `region` - Geographic region
        - `population` - Geographic subregion
        - `location` - Coordinate location
        - `area` - Area of the country in km<sup>2</sup>
        - `timezones` - All timezones within the country
        - `borders` - Codes of bordering countries
        - `currencies` - The country's currencies
        - `languages` - Languages spoken in the country
        - `flag` - SVG image of the country flag
        - `regionalBlocs` - Blocs that the country is a member of
        - `news` - News specific to the country pertaining to COVID-19
        - `sources` - Sources used to collect the included data

#### Path parameters

- `identifier`
    - **Path parameter**
    - **REQUIRED**
    - Specifies the instance to select based on the relevant country.
    - See below for a full list of valid identifiers.

## Case Statistics Endpoints

### GET

Retrieve all instances of case statistics.

- `/case-statistics`

Retrieve an instance of case statistics. See the `identifier` parameter.

- `/case-statistics/:identifier`

### Parameters

#### Query parameters

- `attributes`
    - **Query parameter**
    - **NOT REQUIRED**
    - Specifies which attributes of the case statistics instance(s) to include in the response.
    - Separate multiple desired attributes by commas.
    - If omitted, all fields are included.
    - The `country` and `date` attributes are always included in the response.
    - Options
        - `country` - Identifiers of the associated country
        - `date` - Date of data renewal
        - `location` - Location of the country
        - `totals` - Object containing totals for: cases, deaths, recoveries, and active cases
        - `new` - Object containing data for the number of daily new: cases, deaths, recoveries, and active cases
        - `smoothedNew` - Object containing smoothed (7-day rolling average) data for the number of new cases and deaths
        - `percentages` - Object containing percentage data on fatalities, infection, recoveries, and activeness
            - `fatality` = total deaths / total cases * 100
            - `infected` = total cases / country population * 100
            - `haveRecovered` = total recoveries / total cases * 100
            - `active` = total active / total cases * 100
        - `derivativeNew` = Object containing data on the 7-day rolling average of acceleration of: cases, deaths, recoveries, and active cases
        - `history` - Historical data for the totals data
        - `sources` - Sources used to collect the included data
        - `testing` - Testing data
            - Note that testing data among countries is often sparse and inconsistently reported, which is why each of the following has its own associated date and value. Both will be null if the data does not exist.
            - `newTests` - Daily increase in the number of tests
            - `newTestsSmoothed` - Rolling average of the daily increase in the number of tests
            - `positiveRate` - The positivity rate (positive tests/total tests)
            - `totalTests` - The total number of tests completed

#### Path parameters

- `identifier`
    - **Path parameter**
    - **REQUIRED**
    - Specifies the instance to select based on the relevant country.
    - See below for a full list of valid identifiers.

## Risk Factor Statistics Endpoints

### GET

Retrieve all instances of risk factor statistics.

- `/risk-factor-statistics`

Retireve an instance of risk factor statistics. See the `identifier` parameter.

- `/risk-factor-statistics/:identifier`

### Parameters

#### Query parameters

- `attributes`
    - **Query parameter**
    - **NOT REQUIRED**
    - Specifies which attributes of the risk factor statistics instance(s) to include in the response.
    - Separate multiple desired attributes by commas.
    - If omitted, all fields are included.
    - The `country` attribute is always included in the response.
    - Options
        - `country` - Identifiers of the associated country
        - `location` - Location of the country
        - `populationDensity` - Number of people per km<sup>2</sup>
        - `medianAge` - The median age of the population
        - `aged65Older` - Percentage of population that is 65 or older
        - `aged70Older` - Percentage of population that is 70 or older
        - `gdpPerCapita` - Gross domestic product at purchasing power parity
        - `gini` - Coefficient which measures the level of wealth inequality (larger values imply more inequality)
        - `extremePovertyRate` - Percentage of population living in extreme poverty
        - `cardiovascDeathRate` - Annual number of deaths per 100,000 people resulting from cardiovascular disease
        - `diabetesPrevalence` - Percentage of population which has diabetes
        - `femaleSmokers` - Percentage of women who smoke
        - `maleSmokers` - Percentage of men who smoke
        - `hospitalBedsPerThousand` - Number of hospital beds per 1,000 people
        - `lifeExpectancy` - Life expectancy at birth
        - `humanDevelopmentIndex` - Indicator of level of human development (larger values imply more development)
        - `handwashingFacilities` - Percentage of the population with access to basic handwashing facilities
        - `sources` - Sources used to collect the included data

#### Path parameters

- `identifier`
    - **Path parameter**
    - **REQUIRED**
    - Specifies the instance to select based on the relevant country.
    - See below for a full list of valid identifiers.

## Search Endpoints

### GET

Perform a search query.

- `/search`

### Parameters

#### Query parameters

- `query`
    - **Query parameter**
    - **REQUIRED**
    - Specifies the query to perform the search with.

## Global News Endpoints

### GET

Retrieve global news relating to COVID-19.

- `/global-news`

### Parameters

N/A

## Global Stats Endpoints

### GET

Retrieve global statistics for COVID-19.

- `/global-stats`

### Parameters

N/A

## Identifiers

### Afghanistan
- Afghanistan
- AFG
- AF

### Albania
- Albania
- ALB
- AL

### Algeria
- Algeria
- DZA
- DZ

### Andorra
- Andorra
- AND
- AD

### Angola
- Angola
- AGO
- AO

### Antigua and Barbuda
- Antigua and Barbuda
- ATG
- AG

### Argentina
- Argentina
- ARG
- AR

### Armenia
- Armenia
- ARM
- AM

### Australia
- Australia
- AUS
- AU

### Austria
- Austria
- AUT
- AT

### Azerbaijan
- Azerbaijan
- AZE
- AZ

### Bahamas
- Bahamas
- BHS
- BS

### Bahrain
- Bahrain
- BHR
- BH

### Bangladesh
- Bangladesh
- BGD
- BD

### Barbados
- Barbados
- BRB
- BB

### Belarus
- Belarus
- BLR
- BY

### Belgium
- Belgium
- BEL
- BE

### Belize
- Belize
- BLZ
- BZ

### Benin
- Benin
- BEN
- BJ

### Bhutan
- Bhutan
- BTN
- BT

### Bolivia
- Bolivia
- BOL
- BO

### Bosnia and Herzegovina
- Bosnia and Herzegovina
- BIH
- BA

### Botswana
- Botswana
- BWA
- BW

### Brazil
- Brazil
- BRA
- BR

### Brunei
- Brunei
- BRN
- BN

### Bulgaria
- Bulgaria
- BGR
- BG

### Burkina Faso
- Burkina Faso
- BFA
- BF

### Burundi
- Burundi
- BDI
- BI

### Cambodia
- Cambodia
- KHM
- KH

### Cameroon
- Cameroon
- CMR
- CM

### Canada
- Canada
- CAN
- CA

### Cape Verde
- Cape Verde
- CPV
- CV

### Central African Republic
- Central African Republic
- CAF
- CF

### Chad
- Chad
- TCD
- TD

### Chile
- Chile
- CHL
- CL

### China
- China
- CHN
- CN

### Colombia
- Colombia
- COL
- CO

### Comoros
- Comoros
- COM
- KM

### Congo
- Congo
- COG
- CG

### Costa Rica
- Costa Rica
- CRI
- CR

### Cote d'Ivoire
- Cote d'Ivoire
- CIV
- CI

### Croatia
- Croatia
- HRV
- HR

### Cuba
- Cuba
- CUB
- CU

### Cyprus
- Cyprus
- CYP
- CY

### Czech Republic
- Czech Republic
- CZE
- CZ

### Democratic Republic of Congo
- Democratic Republic of Congo
- COD
- CD

### Denmark
- Denmark
- DNK
- DK

### Djibouti
- Djibouti
- DJI
- DJ

### Dominica
- Dominica
- DMA
- DM

### Dominican Republic
- Dominican Republic
- DOM
- DO

### Ecuador
- Ecuador
- ECU
- EC

### Egypt
- Egypt
- EGY
- EG

### El Salvador
- El Salvador
- SLV
- SV

### Equatorial Guinea
- Equatorial Guinea
- GNQ
- GQ

### Eritrea
- Eritrea
- ERI
- ER

### Estonia
- Estonia
- EST
- EE

### Ethiopia
- Ethiopia
- ETH
- ET

### Fiji
- Fiji
- FJI
- FJ

### Finland
- Finland
- FIN
- FI

### France
- France
- FRA
- FR

### Gabon
- Gabon
- GAB
- GA

### Gambia
- Gambia
- GMB
- GM

### Georgia
- Georgia
- GEO
- GE

### Germany
- Germany
- DEU
- DE

### Ghana
- Ghana
- GHA
- GH

### Greece
- Greece
- GRC
- GR

### Grenada
- Grenada
- GRD
- GD

### Guatemala
- Guatemala
- GTM
- GT

### Guinea
- Guinea
- GIN
- GN

### Guinea-Bissau
- Guinea-Bissau
- GNB
- GW

### Guyana
- Guyana
- GUY
- GY

### Haiti
- Haiti
- HTI
- HT

### Honduras
- Honduras
- HND
- HN

### Hungary
- Hungary
- HUN
- HU

### Iceland
- Iceland
- ISL
- IS

### India
- India
- IND
- IN

### Indonesia
- Indonesia
- IDN
- ID

### Iran
- Iran
- IRN
- IR

### Iraq
- Iraq
- IRQ
- IQ

### Ireland
- Ireland
- IRL
- IE

### Israel
- Israel
- ISR
- IL

### Italy
- Italy
- ITA
- IT

### Jamaica
- Jamaica
- JAM
- JM

### Japan
- Japan
- JPN
- JP

### Jordan
- Jordan
- JOR
- JO

### Kazakhstan
- Kazakhstan
- KAZ
- KZ

### Kenya
- Kenya
- KEN
- KE

### Kuwait
- Kuwait
- KWT
- KW

### Kyrgyzstan
- Kyrgyzstan
- KGZ
- KG

### Laos
- Laos
- LAO
- LA

### Latvia
- Latvia
- LVA
- LV

### Lebanon
- Lebanon
- LBN
- LB

### Lesotho
- Lesotho
- LSO
- LS

### Liberia
- Liberia
- LBR
- LR

### Libya
- Libya
- LBY
- LY

### Liechtenstein
- Liechtenstein
- LIE
- LI

### Lithuania
- Lithuania
- LTU
- LT

### Luxembourg
- Luxembourg
- LUX
- LU

### Macedonia
- Macedonia
- MKD
- MK

### Madagascar
- Madagascar
- MDG
- MG

### Malawi
- Malawi
- MWI
- MW

### Malaysia
- Malaysia
- MYS
- MY

### Maldives
- Maldives
- MDV
- MV

### Mali
- Mali
- MLI
- ML

### Malta
- Malta
- MLT
- MT

### Mauritania
- Mauritania
- MRT
- MR

### Mauritius
- Mauritius
- MUS
- MU

### Mexico
- Mexico
- MEX
- MX

### Moldova
- Moldova
- MDA
- MD

### Monaco
- Monaco
- MCO
- MC

### Mongolia
- Mongolia
- MNG
- MN

### Montenegro
- Montenegro
- MNE
- ME

### Morocco
- Morocco
- MAR
- MA

### Mozambique
- Mozambique
- MOZ
- MZ

### Myanmar
- Myanmar
- MMR
- MM

### Namibia
- Namibia
- NAM
- NA

### Nepal
- Nepal
- NPL
- NP

### Netherlands
- Netherlands
- NLD
- NL

### New Zealand
- New Zealand
- NZL
- NZ

### Nicaragua
- Nicaragua
- NIC
- NI

### Niger
- Niger
- NER
- NE

### Nigeria
- Nigeria
- NGA
- NG

### Norway
- Norway
- NOR
- NO

### Oman
- Oman
- OMN
- OM

### Pakistan
- Pakistan
- PAK
- PK

### Palestine
- Palestine
- PSE
- PS

### Panama
- Panama
- PAN
- PA

### Papua New Guinea
- Papua New Guinea
- PNG
- PG

### Paraguay
- Paraguay
- PRY
- PY

### Peru
- Peru
- PER
- PE

### Philippines
- Philippines
- PHL
- PH

### Poland
- Poland
- POL
- PL

### Portugal
- Portugal
- PRT
- PT

### Qatar
- Qatar
- QAT
- QA

### Romania
- Romania
- ROU
- RO

### Russia
- Russia
- RUS
- RU

### Rwanda
- Rwanda
- RWA
- RW

### Saint Kitts and Nevis
- Saint Kitts and Nevis
- KNA
- KN

### Saint Lucia
- Saint Lucia
- LCA
- LC

### Saint Vincent and the Grenadines
- Saint Vincent and the Grenadines
- VCT
- VC

### San Marino
- San Marino
- SMR
- SM

### Sao Tome and Principe
- Sao Tome and Principe
- STP
- ST

### Saudi Arabia
- Saudi Arabia
- SAU
- SA

### Senegal
- Senegal
- SEN
- SN

### Serbia
- Serbia
- SRB
- RS

### Seychelles
- Seychelles
- SYC
- SC

### Sierra Leone
- Sierra Leone
- SLE
- SL

### Singapore
- Singapore
- SGP
- SG

### Slovakia
- Slovakia
- SVK
- SK

### Slovenia
- Slovenia
- SVN
- SI

### Somalia
- Somalia
- SOM
- SO

### South Africa
- South Africa
- ZAF
- ZA

### South Korea
- South Korea
- KOR
- KR

### South Sudan
- South Sudan
- SSD
- SS

### Spain
- Spain
- ESP
- ES

### Sri Lanka
- Sri Lanka
- LKA
- LK

### Sudan
- Sudan
- SDN
- SD

### Suriname
- Suriname
- SUR
- SR

### Swaziland
- Swaziland
- SWZ
- SZ

### Sweden
- Sweden
- SWE
- SE

### Switzerland
- Switzerland
- CHE
- CH

### Syria
- Syria
- SYR
- SY

### Taiwan
- Taiwan
- TWN
- TW

### Tajikistan
- Tajikistan
- TJK
- TJ

### Tanzania
- Tanzania
- TZA
- TZ

### Thailand
- Thailand
- THA
- TH

### Timor
- Timor
- TLS
- TL

### Togo
- Togo
- TGO
- TG

### Trinidad and Tobago
- Trinidad and Tobago
- TTO
- TT

### Tunisia
- Tunisia
- TUN
- TN

### Turkey
- Turkey
- TUR
- TR

### Uganda
- Uganda
- UGA
- UG

### Ukraine
- Ukraine
- UKR
- UA

### United Arab Emirates
- United Arab Emirates
- ARE
- AE

### United Kingdom
- United Kingdom
- GBR
- GB

### United States
- United States
- USA
- US

### Uruguay
- Uruguay
- URY
- UY

### Uzbekistan
- Uzbekistan
- UZB
- UZ

### Vatican
- Vatican
- VAT
- VA

### Venezuela
- Venezuela
- VEN
- VE

### Vietnam
- Vietnam
- VNM
- VN

### Western Sahara
- Western Sahara
- ESH
- EH

### Yemen
- Yemen
- YEM
- YE

### Zambia
- Zambia
- ZMB
- ZM

### Zimbabwe
- Zimbabwe
- ZWE
- ZW
