# Bain Challenge SWE

## Delivery Application Challenge

### 1. Necessary Pieces of Software

NT: Whenever "App" is said, assume both web and mobile apps in a PWA.

Aiming for a working prototype, these are the essential parts:

- **Customer Mobile App**: Interface for customers to place orders.
- **Delivery Person Mobile App**: Business interface for delivery personnel to manage the deliveries.
- **Backend API**: Handles business logic, database interactions, and communication between apps.
- **Admin Web Portal**: Interface for admins to manage the platform (restaurants, delivery personnel, stock, customers). Needs to integrate with client's ERPs.
- **Storage System (One or multiple database units)**: Central, transparent storage system for all data (orders, users, delivery status). It can and should be scaled horizontally.
- **Notification Service**: Sends real-time updates to customers and delivery personnel.
- **Payment Gateway Integration**: Manages transactions between customers, delivery personnel, and the platform.

These pieces of software interact as follows:

1.  **Customer App** and **Delivery App** communicate with the **Backend API**.
2. **Admin Portal** also communicates with the **Backend API**.
3. **Backend API** interacts with the **Database** for storing and retrieving data.
4. **Notification Service** communicates with both the **Customer App** and **Delivery App** to send real-time updates.
5. **Payment Gateway Integration** handles transactions initiated from the **Customer App**.

This assumes the company has good support from internal SRE and DevOps infrastructure teams.

### 2. Architecture Choice

The working prototype is intended to be **basic** and has a *small team*, and thus, to be achieved within a reasonable deadline, an **intermediate/mixed** approach between Micro-services and monolithic must be adopted for the architecture.

- **Modular Monolith**: The core of the application (Backend API) should be developed as a monolithic application to simplify development and reduce overhead. Although microservices are great for scalability and separation of concerns, they are harder to set up and have a significant infrastructure cost. They can also introduce **latency** problems when a simple, fast function call could have been made instead. The transition between monolithic and microservice can be easier than the opposite if done right.
- **Microservices**: Specific components like the Notification Service, Payment Gateway Integration, and Storage Systems can be developed (or integrated from a third party) as microservices, as these systems need high availability, zero downtime, security, and most importantly, scalability as users grow (and sometimes, per client request).

Such a system would include the necessary API Gateways, edge systems, and other network components. This is architecture per se, but it is more associated with the infrastructure than the architecture of the application itself. Often times, the same configuration is reused between different projects.

### 3. Work Methodology

A team with few members would greatly benefit from **Scrum** for development. Its iterative and incremental approach aligns well with the prototype's requirements, allowing for precious regular feedback and adjustments. With bi-weekly or weekly sprints, according to demand and deadline, we can frequently release updates, gather user feedback, and make necessary improvements. This ensures that we stay aligned with the business goals and adapt to any changes swiftly. Unlike a ship, a small boat can and should move faster; to do that, it needs to be able to steer and avoid obstacles.

### 4. Git Workflow

I would use **GitFlow** as the Git workflow strategy. This involves:

- **main branch**: Stable production-ready code.
- **develop branch**: Latest delivered development changes for the next release.
- **feature branches**: New features or improvements.
- **release branches**: Preparing for a new release.
- **hotfix branches**: Quick fixes to production.

This structured approach allows parallel development and simplifies the management of feature additions, bug fixes, and releases. It can be easily integrated into pretty much any sane CI/CD third-party service (and likely intra-company, too).

This would ideally happen in a well-structured git cloud environment with a fair cost, such as GitHub, which has many useful, good-practice features (branch protection, access level, actions, hooks, etc).

Some common-sense yet equally important details would be enforcing naming schemes for commit titles and messages.

### 5. Team Expansion

During the prototype phase, we might need an additional **QA Engineer** to ensure the product's quality and reliability. After the prototype phase, new members such as **Customer Support Specialists (CSMs)** (to handle user queries and issues), **Marketing Experts** (to drive user acquisition and retention), and at least one additional **Backend Developer** (for scaling and maintaining the services) would be necessary.

Again, this assumes the company has good support from internal SRE and DevOps infrastructure teams.

### 6. Other Considerations

To make the development process robust and efficient:

- **Automated Testing**: Implement unit, integration, and end-to-end tests to catch issues early.
- **Continuous Integration/Continuous Deployment (CI/CD)**: Automate builds, testing, and deployments to ensure faster and more reliable releases.
- **Scalability and Security**: Design the architecture to handle scale and ensure security best practices are followed.
- **User Feedback Loops**: Establish mechanisms to regularly gather and act on user feedback to improve the product. This goes beyond picking an agile methodology.
- **Documentation**: Maintain comprehensive documentation for the codebase and processes to facilitate onboarding and collaboration. Ideally, this documentation should be automated for fast iteration.
- **Move fast:** This is the main principle the document aims for. Something is going to break, and it is better if it breaks fast. It is still under development, where all eyes can see.

## Coding Part

Rename the file ".env.example" into ".env" or connect your own database.

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

