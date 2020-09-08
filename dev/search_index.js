var documenterSearchIndex = {"docs":
[{"location":"UI/objective_ui.html#User-Interface-to-Present-the-Objective-Function","page":"(2) Objective","title":"User Interface to Present the Objective Function","text":"","category":"section"},{"location":"UI/objective_ui.html","page":"(2) Objective","title":"(2) Objective","text":"CurrentModule = TrajOptSOCPs","category":"page"},{"location":"UI/objective_ui.html#Linear-Quadratic-Regulator","page":"(2) Objective","title":"Linear Quadratic Regulator","text":"","category":"section"},{"location":"UI/objective_ui.html","page":"(2) Objective","title":"(2) Objective","text":"To avoid generating trajectories too different from the initial trajectory, we can use a Linear Quadratic Regulator as an objective. This has the form:","category":"page"},{"location":"UI/objective_ui.html","page":"(2) Objective","title":"(2) Objective","text":"beginaligned\n frac12 (x_N - x_N ref)^top Q (x_N - x_N ref) + \n frac12 Sigma_n = 1^N-1 (x_n - x_n ref)^top Q (x_n - x_n ref)\n+ (u_n - u_n ref)^top R (u_n - u_n ref))  \nendaligned","category":"page"},{"location":"UI/objective_ui.html","page":"(2) Objective","title":"(2) Objective","text":"Currently the module only supports Q and R matrices that are identical at every timestep, but this can be changed in the future. However, the framework does allow a QP that only uses the Q matrix on the last timestep and ignores it elsewhere.","category":"page"},{"location":"UI/objective_ui.html","page":"(2) Objective","title":"(2) Objective","text":"In the example below, we build a simple diagonal Q and R matrix.","category":"page"},{"location":"UI/objective_ui.html","page":"(2) Objective","title":"(2) Objective","text":"using LinearAlgebra #hide\nconst rocketStart = [2.0; 20.0; 0.0; -15.0] # hide\nlqrQMat = 0.0001 * Diagonal(I, size(rocketStart, 1))\nlqrRMat = 0.0025 * Diagonal(I, Int64(size(rocketStart, 1) / 2))\nnothing #hide","category":"page"},{"location":"UI/objective_ui.html","page":"(2) Objective","title":"(2) Objective","text":"We reference the trajectory to the initial trajectory.","category":"page"},{"location":"UI/objective_ui.html","page":"(2) Objective","title":"(2) Objective","text":"using LinearAlgebra, TrajOptSOCPs #hide\nconst rocketStart = [2.0; 20.0; 0.0; -15.0] # hide\nconst rocketEnd = [0.0; 0.0; 0.0; 0.0] # hide\nuHover = [0.0, -10.0] # hide\n\nlqrQMat = 0.0001 * Diagonal(I, size(rocketStart, 1)) # hide\nlqrRMat = 0.0025 * Diagonal(I, Int64(size(rocketStart, 1) / 2)) # hide\nconst NSteps = 60 # hide\n\ninitTraj = initializeTraj(rocketStart, rocketEnd, uHover, uHover, NSteps)\n\ncostFun = makeLQR_TrajReferenced(lqrQMat, lqrRMat, NSteps, initTraj)","category":"page"},{"location":"UI/objective_ui.html","page":"(2) Objective","title":"(2) Objective","text":"For more information, see","category":"page"},{"location":"UI/objective_ui.html","page":"(2) Objective","title":"(2) Objective","text":"LQR_QP_Referenced","category":"page"},{"location":"UI/objective_ui.html#TrajOptSOCPs.LQR_QP_Referenced","page":"(2) Objective","title":"TrajOptSOCPs.LQR_QP_Referenced","text":"LQR_QP_Referenced(lqr_qp::LQR_QP, xRef)\n\nAn LQR what acts like a QP objective function, but with a reference trajectory.\n\n\n\n\n\n","category":"type"},{"location":"UI/solver_ui.html#User-Interface-to-Solve-the-Optimization-Problem","page":"(5) Solve","title":"User Interface to Solve the Optimization Problem","text":"","category":"section"},{"location":"UI/solver_ui.html","page":"(5) Solve","title":"(5) Solve","text":"CurrentModule = TrajOptSOCPs","category":"page"},{"location":"UI/solver_ui.html","page":"(5) Solve","title":"(5) Solve","text":"The solver requires a set of parameters. Thereafter, we can just run the solver using the problem defined by the augmented lagrangian.","category":"page"},{"location":"UI/solver_ui.html#Solver-Parameters","page":"(5) Solve","title":"Solver Parameters","text":"","category":"section"},{"location":"UI/solver_ui.html","page":"(5) Solve","title":"(5) Solve","text":"The solver has many knobs. The recommended settings are below:","category":"page"},{"location":"UI/solver_ui.html","page":"(5) Solve","title":"(5) Solve","text":"using TrajOptSOCPs; #hide\ncurrSolveParams = solverParams(0.1, 0.5,\n                                8, 10,\n                                10^-4,\n                                10, 10^6,\n                                2.5, 2, 0.2, 0.2, 0.4)\nTrajOptSOCPs.solParamPrint(currSolveParams)","category":"page"},{"location":"UI/solver_ui.html","page":"(5) Solve","title":"(5) Solve","text":"For more information, see","category":"page"},{"location":"UI/solver_ui.html","page":"(5) Solve","title":"(5) Solve","text":"solverParams\nsolParamPrint","category":"page"},{"location":"UI/solver_ui.html#TrajOptSOCPs.solverParams","page":"(5) Solve","title":"TrajOptSOCPs.solverParams","text":"Line Search Parameters (Notation from Toussaint Notes (2020))\n\nparamA::Float16         # Used in Line Search, should be [0.01, 0.3]\n\nparamB::Float16         # Used in Line Search, should be [0.1, 0.8]\n\n\n\nIteration Counter Parameters\n\nmaxOuterIters::Int32    # Number of Outer Loop iterations\n\nmaxNewtonSteps::Int32   # Number of Newton Steps per Outer Loop iterations\n\n\n\nExit Condition Parameter\n\nrTol::Float64           # When steps are within rTol, loop will stop.\n\n\n\nPenalty Update Parameters\n\npenaltyStep::Float16    # Multiplies the penalty parameter per outer loop\n\npenaltyMax::Float64     # Maximum value of the penalty parameter\n\n\n\nTrust Region Parameters (Notation from Nocedal et Yuan (1998))\n\ntrSizeStart::Float32    # Starting size of the trust region\n\ntrc1::Float16           # Success Size Increase Parameter (1 < c1)\n\ntrc2::Float16           # Taylor Series Error Parameter (0 < c2 < 1)\n\ntrc3::Float16           # Failed Size Reduction Parameter (0 < c3 < c4)\n\ntrc4::Float16           # Failed Size Reduction Parameter (c3 < c4 < 1)\n\n\n\n\n\n","category":"type"},{"location":"UI/solver_ui.html#TrajOptSOCPs.solParamPrint","page":"(5) Solve","title":"TrajOptSOCPs.solParamPrint","text":"Prints the struct variables in the solverParams struct.\n\nSee also: solverParams for more information.\n\n\n\n\n\n","category":"function"},{"location":"UI/solver_ui.html#Solve-it!","page":"(5) Solve","title":"Solve it!","text":"","category":"section"},{"location":"UI/solver_ui.html","page":"(5) Solve","title":"(5) Solve","text":"At last, we can solve the problem!","category":"page"},{"location":"UI/solver_ui.html","page":"(5) Solve","title":"(5) Solve","text":"# Initialize the primal-dual vector\n# initTraj is from the rocket guess trajectory\n# lambdaInit is from the dynamics constraints\ninitTrajPD = [initTraj; lambdaInit]\n\ntrajLambdaSolved, resArr = ALPrimalNewtonMain(initTrajPD, alRocket, currSolveParams)","category":"page"},{"location":"UI/solver_ui.html","page":"(5) Solve","title":"(5) Solve","text":"For more information, see","category":"page"},{"location":"UI/solver_ui.html","page":"(5) Solve","title":"(5) Solve","text":"ALPrimalNewtonMain","category":"page"},{"location":"UI/solver_ui.html#TrajOptSOCPs.ALPrimalNewtonMain","page":"(5) Solve","title":"TrajOptSOCPs.ALPrimalNewtonMain","text":"ALPrimalNewtonMain(y0, al::augLag, sp::solverParams)\n\nPerforms a maximum on N outer steps as specified by solverParams. May return early if the residual is lower than the tolerance specified by solverParams and the constraint penalty is high enough.\n\nThe function operates on an augmented lagrangian (AL) with primals (P) only (as opposed to a Primal-Dual set-up) for second-order cone programs (SOCP). See newtonTRLS_ALP for more information on the Newton Steps\n\nreturns (yStates, residuals) which are:\n\nyStates: An array with one entry of the primal vector per Newton step\nresiduals: An array with one entry of the residual vector per Newton step\n\nSee also: augLag\n\n\n\n\n\n","category":"function"},{"location":"UI/ui.html#User-Interface-to-Module","page":"Overview","title":"User Interface to Module","text":"","category":"section"},{"location":"UI/ui.html","page":"Overview","title":"Overview","text":"This section details how to interface with the module to begin optimizing trajectories.","category":"page"},{"location":"UI/ui.html","page":"Overview","title":"Overview","text":"To interface with the solver, please construct the following objects:","category":"page"},{"location":"UI/ui.html","page":"Overview","title":"Overview","text":"A rocket and guess trajectory\nAn objective\nThe constraints\nThe augmented lagrangian","category":"page"},{"location":"UI/ui.html","page":"Overview","title":"Overview","text":"Thereafter, you can solve the problem. This user interface section will guide you in creating each of these objects. This guide uses the examples stored in the examples folder.","category":"page"},{"location":"UI/augLag_ui.html#User-Interface-to-Synthesize-an-Augmented-Lagrangian","page":"(4) Augmented Lagrangian","title":"User Interface to Synthesize an Augmented Lagrangian","text":"","category":"section"},{"location":"UI/augLag_ui.html","page":"(4) Augmented Lagrangian","title":"(4) Augmented Lagrangian","text":"The last step is to form the Augmented Lagrangian. We generate the struct in two steps (assuming that the objective and constraints have been instantiated).","category":"page"},{"location":"UI/augLag_ui.html","page":"(4) Augmented Lagrangian","title":"(4) Augmented Lagrangian","text":"# Equiped with the constraint term and the objective term, I now build the\n# Augmented Lagrangian\npenaltyStart = 1.0\nalRocket = augLag(costFun, cMRocket, penaltyStart)","category":"page"},{"location":"UI/augLag_ui.html","page":"(4) Augmented Lagrangian","title":"(4) Augmented Lagrangian","text":"For more information, see","category":"page"},{"location":"UI/augLag_ui.html","page":"(4) Augmented Lagrangian","title":"(4) Augmented Lagrangian","text":"augLag","category":"page"},{"location":"UI/augLag_ui.html#TrajOptSOCPs.augLag","page":"(4) Augmented Lagrangian","title":"TrajOptSOCPs.augLag","text":"augLag(obj::objectiveFunc, cM::constraintManager, rho::Float64)\n\nThis is a mutable struct that stores an SOCP Augmented Lagrangian.\n\nFor a single SOCP constraint, the lagrangian is\n\nφ(y) = f(y) + (ρ2) c(y)_2^2 + λ c(y)\n\nφ(y) = f(y) + (ρ2) c(y)c(y)    + λ c(y)\n\nWhere y is represented a primal vector struct.\n\nGenerally, we initialize ρ to 1.\n\nSee also: evalAL, evalGradAL, evalHessAl\n\n\n\n\n\n","category":"type"},{"location":"UI/rocket_ui.html#User-Interface-to-Make-a-Model-Rocket","page":"(1) Rockets","title":"User Interface to Make a Model Rocket","text":"","category":"section"},{"location":"UI/rocket_ui.html","page":"(1) Rockets","title":"(1) Rockets","text":"CurrentModule = TrajOptSOCPs","category":"page"},{"location":"UI/rocket_ui.html#Let's-make-a-rocket!","page":"(1) Rockets","title":"Let's make a rocket!","text":"","category":"section"},{"location":"UI/rocket_ui.html","page":"(1) Rockets","title":"(1) Rockets","text":"For the sake of clarity, assume all units are in base SI units. The main simple struct is the rocket_simple struct:","category":"page"},{"location":"UI/rocket_ui.html","page":"(1) Rockets","title":"(1) Rockets","text":"rocket_simple","category":"page"},{"location":"UI/rocket_ui.html#TrajOptSOCPs.rocket_simple","page":"(1) Rockets","title":"TrajOptSOCPs.rocket_simple","text":"rocket_simple(mass, isp, grav, deltaTime)\n\nBarebones \"spherical\" rocket. This is to say, this struct only holds the mass and the isp (specific impulse) of the rocket.\n\n\n\n\n\n","category":"type"},{"location":"UI/rocket_ui.html","page":"(1) Rockets","title":"(1) Rockets","text":"Below is an example of how you make the most basic rocket. To obtain the best results, we set the mass to 1 (hence all relevant units would be in \"per rocket mass\" units). The gravity vector should match the problem dimensionality. In the example below, the gravity vector is two dimensional and pointed in the negative \"y\" direction.","category":"page"},{"location":"UI/rocket_ui.html","page":"(1) Rockets","title":"(1) Rockets","text":"using LinearAlgebra, TrajOptSOCPs","category":"page"},{"location":"UI/rocket_ui.html","page":"(1) Rockets","title":"(1) Rockets","text":"mass = 1\nisp = 1\ngrav = [0; -9.81]\ndeltaTime = 1\nrocket = rocket_simple(mass, isp, grav, deltaTime)","category":"page"},{"location":"UI/rocket_ui.html#Guess-a-trajectory!","page":"(1) Rockets","title":"Guess a trajectory!","text":"","category":"section"},{"location":"UI/rocket_ui.html","page":"(1) Rockets","title":"(1) Rockets","text":"Now that we have a rocket, we specify the starting point (where the rocket is right now) and the end point (where you want the rocket to land). Note that the state x denotes the combined position and velocity vector: [s; v].","category":"page"},{"location":"UI/rocket_ui.html","page":"(1) Rockets","title":"(1) Rockets","text":"In the example below, we start the rocket at (2.0, 20.0) and expect it to land at (0.0, 0.0). Moreover, we start the rocket in a freefall with velocity of (0.0, -15.0) and expect it to softly land with zero velocity (0.0, 0.0).","category":"page"},{"location":"UI/rocket_ui.html","page":"(1) Rockets","title":"(1) Rockets","text":"const rocketStart = [2.0; 20.0; 0.0; -15.0]\nconst rocketEnd = [0.0; 0.0; 0.0; 0.0]\nnothing #hide","category":"page"},{"location":"UI/rocket_ui.html","page":"(1) Rockets","title":"(1) Rockets","text":"We can also initialize a base thrust, which is most simply the hover thrust.","category":"page"},{"location":"UI/rocket_ui.html","page":"(1) Rockets","title":"(1) Rockets","text":"mass = 1; grav = 1; # hide\nuHover = mass * grav\nnothing #hide","category":"page"},{"location":"UI/rocket_ui.html","page":"(1) Rockets","title":"(1) Rockets","text":"Lastly, we specify the number of steps in the simulation (combined with the deltaTime parameter above, this implies an a priori flight time).","category":"page"},{"location":"UI/rocket_ui.html","page":"(1) Rockets","title":"(1) Rockets","text":"# Number of time steps to discretize the trajectory\nconst NSteps = 60\nnothing #hide","category":"page"},{"location":"UI/rocket_ui.html","page":"(1) Rockets","title":"(1) Rockets","text":"With the information above, we now have the information to build a guess trajectory:","category":"page"},{"location":"UI/rocket_ui.html","page":"(1) Rockets","title":"(1) Rockets","text":"const rocketStart = [2.0; 20.0; 0.0; -15.0] # hide\nconst rocketEnd = [0.0; 0.0; 0.0; 0.0] # hide\nuHover = [0.0, -10.0] # hide\nconst NSteps = 60 # hide\ninitTraj = initializeTraj(rocketStart, rocketEnd, uHover, uHover, NSteps)","category":"page"},{"location":"UI/rocket_ui.html","page":"(1) Rockets","title":"(1) Rockets","text":"For more details, see below:","category":"page"},{"location":"UI/rocket_ui.html","page":"(1) Rockets","title":"(1) Rockets","text":"initializeTraj","category":"page"},{"location":"UI/rocket_ui.html#TrajOptSOCPs.initializeTraj","page":"(1) Rockets","title":"TrajOptSOCPs.initializeTraj","text":"initializeTraj(x0::Array{Float64, 1}, xN::Array{Float64, 1}, NSteps::Int64)\n\nInitializes the full XU vector (see example below) using a linear interpolation from the initial point x0 to the final point xN.\n\nTake x0 = [s0; v0] and xN = [sN; vN] to be of size (2n×1). The full XU vector size is (3Nn + 2n)×1.\n\nFor example, take a 2D system: x0 = [sx0; sy0; vx0; vy0] and                                xN = [sxN; syN; vxN, vyN].\n\nThe controls are uk = [uxk; uyk]. Thus, for N = 4\n\nXU vector = [x0; u0; x1; u1; x2; u2; x3; u3; x4]\n\nwhich is of size ((4 + 2) + (4 + 2) + (4 + 2) + (4 + 2) + (4)) = 28 or equivalently 3Nn + 2n = 3(4)(2) + 2(2) = 24 + 4 = 28, as desired.\n\n\n\n\n\ninitializeTraj(x0::Array{Float64, 1}, xN::Array{Float64, 1},\n           u0::Array{Float64, 1}, uN::Array{Float64, 1},\n           NSteps::Int64)\n\nInitializes the full XU vector (see example below) using a linear interpolation from the initial point x0 to the final point xN.\n\nTake x0 = [s0; v0] and xN = [sN; vN] to be of size (2n×1). The full XU vector size is (3Nn + 2n)×1.\n\nFor example, take a 2D system: x0 = [sx0; sy0; vx0; vy0] and                                xN = [sxN; syN; vxN, vyN].\n\nThe controls are uk = [uxk; uyk]. Thus, for N = 4\n\nXU vector = [x0; u0; x1; u1; x2; u2; x3; u3; x4]\n\nwhich is of size ((4 + 2) + (4 + 2) + (4 + 2) + (4 + 2) + (4)) = 28 or equivalently 3Nn + 2n = 3(4)(2) + 2(2) = 24 + 4 = 28, as desired.\n\n\n\n\n\n","category":"function"},{"location":"index.html#SOCP-Trajectory-Optimization-Documentation","page":"Home","title":"SOCP Trajectory Optimization Documentation","text":"","category":"section"},{"location":"index.html","page":"Home","title":"Home","text":"The key functionality is the primal SOCP solver for Trajectory Optimization.","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"CurrentModule = TrajOptSOCPs","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"The SOCP trajectory optimization problem is formulated as follows.","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"beginaligned\nundersetx_1N u_1N-1textminimize quad frac12 (x_N - x_N ref)^top Q (x_N - x_N ref) + \n frac12 Sigma_n = 1^N-1 (x_n - x_n ref)^top Q (x_n - x_n ref)\n+ (u_n - u_n ref)^top R (u_n - u_n ref))  \ntextsubject to quad x_k + 1 = A x_k + B u_k + C \n H x u  h \n u_k  u_max\nendaligned","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"Table of Contents:","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"Pages   = [\"UI/ui.md\"]","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"TrajOptSOCPs","category":"page"},{"location":"index.html#TrajOptSOCPs.TrajOptSOCPs","page":"Home","title":"TrajOptSOCPs.TrajOptSOCPs","text":"TrajOptSOCPs\n\nA native Julia library to solve trajectory optimization problems that contain second-order cone constraints.\n\nAuthor: Daniel Neamati (Summer 2020)\n\nAdvisor: Prof. Zachary Manchester (REx Lab at Stanford University)\n\nFunding graciously provided by Caltech SURF program and the Homer J. Stewart Fellowship.\n\n\n\n\n\n","category":"module"},{"location":"UI/constraints_ui.html#User-Interface-to-Establish-the-Constraints","page":"(3) Constraints","title":"User Interface to Establish the Constraints","text":"","category":"section"},{"location":"UI/constraints_ui.html","page":"(3) Constraints","title":"(3) Constraints","text":"The constraints are at the heart of this project. So far, the package includes three different types of constraints:","category":"page"},{"location":"UI/constraints_ui.html","page":"(3) Constraints","title":"(3) Constraints","text":"Dynamic Constraints (Affine Equality Constraints)\nGround Constraints (Affine Inequality Constraints)\nMax Thrust Constraints (Second Order Cone Constraints)","category":"page"},{"location":"UI/constraints_ui.html","page":"(3) Constraints","title":"(3) Constraints","text":"We will explore each of these in this order. All of the constraints are fed into a constraintManager.","category":"page"},{"location":"UI/constraints_ui.html#Dynamic-Constraints","page":"(3) Constraints","title":"Dynamic Constraints","text":"","category":"section"},{"location":"UI/constraints_ui.html","page":"(3) Constraints","title":"(3) Constraints","text":"In continuous time, we have a differential equation of the form:","category":"page"},{"location":"UI/constraints_ui.html","page":"(3) Constraints","title":"(3) Constraints","text":"fracdxdt = tilde Ax + tilde Bu + tilde C","category":"page"},{"location":"UI/constraints_ui.html","page":"(3) Constraints","title":"(3) Constraints","text":"We solve this via Matrix exponentiation which yields a discretized equation of the form:","category":"page"},{"location":"UI/constraints_ui.html","page":"(3) Constraints","title":"(3) Constraints","text":"x_k+1 = A x_k + B u_k + C","category":"page"},{"location":"UI/constraints_ui.html","page":"(3) Constraints","title":"(3) Constraints","text":"Where tilde A neq A, tilde B neq B, and tilde C neq C. To formulate this as an Affine Equality constraint, we want to write this in the form Ax = b. Thus we rearrange this as","category":"page"},{"location":"UI/constraints_ui.html","page":"(3) Constraints","title":"(3) Constraints","text":"A x_k + B u_k - I x_k+1 = -C","category":"page"},{"location":"UI/constraints_ui.html","page":"(3) Constraints","title":"(3) Constraints","text":"The left hand side defines the matrix A_DYN and the right hand side defines b_DYN. Generally, we also want to include constraints on the initial and final states specifically. This is all handled together in the below call:","category":"page"},{"location":"UI/constraints_ui.html","page":"(3) Constraints","title":"(3) Constraints","text":"# Create the Dynamics Constraints\nconst ADyn, BDyn = rocketDynamicsFull(rocket, rocketStart, rocketEnd, NSteps)","category":"page"},{"location":"UI/constraints_ui.html","page":"(3) Constraints","title":"(3) Constraints","text":"Then the dynamics constraint and associated dual variable are created:","category":"page"},{"location":"UI/constraints_ui.html","page":"(3) Constraints","title":"(3) Constraints","text":"dynConstraint = AL_AffineEquality(ADyn, BDyn)\nlambdaInit = -1 * ones(size(BDyn))","category":"page"},{"location":"UI/constraints_ui.html","page":"(3) Constraints","title":"(3) Constraints","text":"Note that the two are separated just in case the you (1) don't care about the initial or final points or (2) want the A_DYN matrix and b_DYN vector after the fact.","category":"page"},{"location":"UI/constraints_ui.html#Ground-Constraints","page":"(3) Constraints","title":"Ground Constraints","text":"","category":"section"},{"location":"UI/constraints_ui.html","page":"(3) Constraints","title":"(3) Constraints","text":"Currently the ground constraints only handle flat ground level with the origin. This is generally acceptable for the rocket soft landing problem since we can choose the coordinate system and rockets generally land on flat areas. However, it is totally possible to include more complicated terrain in future updates.","category":"page"},{"location":"UI/constraints_ui.html","page":"(3) Constraints","title":"(3) Constraints","text":"Since this is a simple constraint, makeGroundConstraint handles it in one go. We only need to provide the dimensionality and normal vector to the ground. As before, we initialize the associated dual variables.","category":"page"},{"location":"UI/constraints_ui.html","page":"(3) Constraints","title":"(3) Constraints","text":"# Create the Ground Constraints\ngroundConstraint = makeGroundConstraint(NSteps, size(grav, 1), size(grav, 1))\ngroundLambda = zeros(size(groundConstraint.b, 1))","category":"page"},{"location":"UI/constraints_ui.html#Max-Thrust-Constraints","page":"(3) Constraints","title":"Max Thrust Constraints","text":"","category":"section"},{"location":"UI/constraints_ui.html","page":"(3) Constraints","title":"(3) Constraints","text":"This is the crux of the novel addition enabled by this package. Most of the work is handled behind the scenes. The user only needs to provide the maximum thrust (as a positive Float64). As before, initialize the associated dual variables.","category":"page"},{"location":"UI/constraints_ui.html","page":"(3) Constraints","title":"(3) Constraints","text":"thrustMax = 20.0\nmaxThrustConstraint = makeMaxThrustConstraint(NSteps, size(grav, 1), thrustMax)\nmaxThrustLambda = zeros(size(maxThrustConstraint.indicatorList))","category":"page"},{"location":"UI/constraints_ui.html#Stitch-it-all-together!","page":"(3) Constraints","title":"Stitch it all together!","text":"","category":"section"},{"location":"UI/constraints_ui.html","page":"(3) Constraints","title":"(3) Constraints","text":"Now we stitch it all together. The dynamics are put as a special case, the rest of the constraints are added as an array:","category":"page"},{"location":"UI/constraints_ui.html","page":"(3) Constraints","title":"(3) Constraints","text":"cMRocket = constraintManager_Dynamics([groundConstraint, maxThrustConstraint],\n                                      [groundLambda, maxThrustLambda],\n                                      dynConstraint, lambdaInit)","category":"page"},{"location":"UI/constraints_ui.html","page":"(3) Constraints","title":"(3) Constraints","text":"For more information see:","category":"page"},{"location":"UI/constraints_ui.html","page":"(3) Constraints","title":"(3) Constraints","text":"constraintManager_Dynamics","category":"page"},{"location":"UI/constraints_ui.html#TrajOptSOCPs.constraintManager_Dynamics","page":"(3) Constraints","title":"TrajOptSOCPs.constraintManager_Dynamics","text":"constraintManager_Dynamics\n\nContains a list of constraints and the dual variables (lambda) that correspond with each constraint.\n\nUnlike constraintManager_Base, this constraint manager also has the dynamics constraints embedded such that the nearest dynamically feasible trajectory can be determined at any given time.\n\n\n\n\n\n","category":"type"}]
}
