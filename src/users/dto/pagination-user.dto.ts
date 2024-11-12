export class PaginationUserDto {
    page: number;
    limit: number;
    nome?: string;
    orderBy?: string;
    orderDirection?: 'ASC' | 'DESC';
}