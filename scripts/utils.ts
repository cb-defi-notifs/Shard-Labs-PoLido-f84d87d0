import { Contract, ethers } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { publicKeyCreate } from "secp256k1";

export const getPublicKey = (privateKey: string): Uint8Array => {
    const privKeyBytes = ethers.utils.arrayify(privateKey);
    const pubKeyBytes = publicKeyCreate(privKeyBytes, false).slice(1);

    return pubKeyBytes;
};

export const attachContract = async (
    hre: HardhatRuntimeEnvironment,
    contractAddress: string,
    contractName: string
): Promise<Contract> => {
    const [admin] = await hre.ethers.getSigners();

    const ContractFactory = await hre.ethers.getContractFactory(
        contractName,
        admin
    );
    const contract = ContractFactory.attach(contractAddress);

    return contract;
};