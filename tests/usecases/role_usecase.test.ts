import { CreateRoleInput, RoleModel } from "../../src/domain/model/role_model";
import IRoleRepo from "../../src/domain/repositories/role_repo_int";
import { HttpException } from "../../src/utils/exception";
import RoleUsecase from "../../src/usecases/role_usecase";
import logger from "../../src/utils/logger";


const mockRepository: jest.Mocked<IRoleRepo> = {
  createRole: jest.fn(),
  findOne: jest.fn(),
  getRole: jest.fn(),
  deleteRole: jest.fn(),
};
const mockLoggerError = jest.spyOn(logger, 'error');

describe('RoleUsecase', () => {
  let roleUsecase: RoleUsecase;

  beforeEach(() => {
    // Reset mock calls before each test
    jest.clearAllMocks();
    roleUsecase = new RoleUsecase(mockRepository);
  });

  describe('createRole', () => {
    it('should create a role when role does not exist', async () => {
      const input: CreateRoleInput = { roleName: 'admin', visibility: ['public'] };
      const roleModel: RoleModel = { rolename: 'admin', visibility: ['public'] };
      const createdRole = { rolename: 'admin', visibility: ['public'], roleId: 1 };
  
      // Mocking findOne to return null (indicating role does not exist)
      mockRepository.findOne.mockResolvedValue(null);
      // Mocking createRole to return a new role
      mockRepository.createRole.mockResolvedValue(createdRole);
  
      const result = await roleUsecase.createRole(input);
  
      expect(mockRepository.findOne).toHaveBeenCalledWith({ role_name: 'admin' });
      expect(mockRepository.createRole).toHaveBeenCalledWith(roleModel);
      expect(result).toEqual(createdRole);
    });

    it('should throw an error if role already exists', async () => {
      const input: CreateRoleInput = { roleName: 'admin', visibility: ['public'] };
      const existingRole = { roleId: 1, rolename: 'admin', visibility: ['public'] };
  
      // Mocking findOne to return an existing role
      mockRepository.findOne.mockResolvedValue(existingRole);
  
      await expect(roleUsecase.createRole(input)).rejects.toThrow(HttpException);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ role_name: 'admin' });
      expect(mockLoggerError).toHaveBeenCalledWith('rolename already exists');
    });
  });

  describe('getRole', () => {
    it('should return all roles', async () => {
      const roles = [{ id: 1, rolename: 'admin', visibility: true }];
      // Mocking getRole to return a list of roles
      mockRepository.getRole.mockResolvedValue(roles);

      const result = await roleUsecase.getRole();

      expect(mockRepository.getRole).toHaveBeenCalled();
      expect(result).toEqual(roles);
    });
  });

  describe('getRoleById', () => {
    it('should return the role when found', async () => {
      const role = { roleId: 1, rolename: 'admin', visibility: ['public'] };

      // Mocking findOne to return a role
      mockRepository.findOne.mockResolvedValue(role);

      const result = await roleUsecase.getRoleById(1);

      expect(mockRepository.findOne).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual(role);
    });

    it('should throw an error if role not found', async () => {
      // Mocking findOne to return null
      mockRepository.findOne.mockResolvedValue(null);

      await expect(roleUsecase.getRoleById(1)).rejects.toThrow(HttpException);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ id: 1 });
    });
  });

  describe('deleteRole', () => {
    it('should delete the role if found', async () => {
      const role = { id: 1, rolename: 'admin', visibility: ['read'] };

      // Mocking getRoleById to return a role
      jest.spyOn(roleUsecase, 'getRoleById').mockResolvedValue(role);
      // Mocking deleteRole to return success
      mockRepository.deleteRole.mockResolvedValue(true);

      const result = await roleUsecase.deleteRole(1);

      expect(roleUsecase.getRoleById).toHaveBeenCalledWith(1);
      expect(mockRepository.deleteRole).toHaveBeenCalledWith(1);
      expect(result).toBe(true);
    });

    it('should not delete role if not found', async () => {
      // Mocking getRoleById to throw an error
      jest.spyOn(roleUsecase, 'getRoleById').mockRejectedValue(new HttpException(400, 'Role Not Found'));

      await expect(roleUsecase.deleteRole(1)).rejects.toThrow(HttpException);
      expect(mockRepository.deleteRole).not.toHaveBeenCalled();
    });
  });
});