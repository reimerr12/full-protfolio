import { ethers } from "ethers";

//todo add contract and abi;
export const contractAddress = '0x60ecd89e6ae621cde8e6a78d84cea4a72325895b';
export const contractAbi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "period",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "qualification",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "skillsLearned",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "institution",
				"type": "string"
			}
		],
		"name": "addEdus",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "details",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "imageUrl",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "repoLink",
				"type": "string"
			}
		],
		"name": "addProject",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "duration",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "position",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "skillsGained",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "organization",
				"type": "string"
			}
		],
		"name": "addWork",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "supportMe",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "newBio",
				"type": "string"
			}
		],
		"name": "updateBio",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "newCv",
				"type": "string"
			}
		],
		"name": "updateCv",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "eduIndex",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "period",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "qualification",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "skillsLearned",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "institution",
				"type": "string"
			}
		],
		"name": "updateEdu",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "newImage",
				"type": "string"
			}
		],
		"name": "updateProfileImage",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "details",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "imageUrl",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "repoLink",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "projectIndex",
				"type": "uint256"
			}
		],
		"name": "updateProject",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "duration",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "position",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "skillsGained",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "organization",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "workIndex",
				"type": "uint256"
			}
		],
		"name": "updateWork",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "bio",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "cvLink",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getEdu",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "eduId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "period",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "qualification",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "skillsLearned",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "institution",
						"type": "string"
					}
				],
				"internalType": "struct portfolio.EducationInfo[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getOwner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getProjects",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "projectId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "details",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "imageUrl",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "repoLink",
						"type": "string"
					}
				],
				"internalType": "struct portfolio.projectInfo[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getWork",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "workId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "duration",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "position",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "skillsGained",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "organization",
						"type": "string"
					}
				],
				"internalType": "struct portfolio.WorkInfo[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "myEdu",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "eduId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "period",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "qualification",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "skillsLearned",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "institution",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "myProjects",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "projectId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "details",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "imageUrl",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "repoLink",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "myWork",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "workId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "duration",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "position",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "skillsGained",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "organization",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "profileImage",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]