import { HcpVaultSecretManager } from "./hashicorp/HcpVaultSecretManager";
import { SecretManagerConfigs, SecretManagerType } from "./SecretManagerConfig";
import { SecretManagerBase } from "./SecretManagerBase";

export class SecretManager {
  static defaultType(): SecretManagerType {
    const typeFromEnv = process.env.SECRET_MANAGER as SecretManagerType
    if (typeFromEnv && Object.values(SecretManagerType).includes(typeFromEnv)) {
      return typeFromEnv
    } else {
      return SecretManagerType.HCP_VAULT
    }
  }

  static getSecretManagerType(secretManagerType?: SecretManagerType): SecretManagerType {
    if (!secretManagerType) {
      secretManagerType = this.defaultType();
    }
    else if (!Object.values(SecretManagerType).includes(secretManagerType)) {
      throw new Error("Invalid Secret Manager Type")
    }

    return secretManagerType;
  }

  static New(secretManagerType?: SecretManagerType): SecretManagerBase {
    secretManagerType = this.getSecretManagerType(secretManagerType)
    
    const configs = SecretManagerConfigs.getConfig(secretManagerType)

    switch (secretManagerType) {
      case SecretManagerType.HCP_VAULT:
        return new HcpVaultSecretManager(configs)
      case SecretManagerType.AWS:
        return /* new AwsSecretsManager(config) */
      case SecretManagerType.GCP:
        return /* new GcpSecretManager(config) */
      case SecretManagerType.AZURE:
        return /* new AzureSecretManager(config) */
      default:
        throw new Error("Invalid Secret Manager Type")
    }
  }
}
