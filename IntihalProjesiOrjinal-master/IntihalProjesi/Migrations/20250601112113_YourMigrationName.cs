using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntihalProjesi.Migrations
{
    /// <inheritdoc />
    public partial class YourMigrationName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ComparisonJsonDetail_Dosyalar_FirstFileId",
                table: "ComparisonJsonDetail");

            migrationBuilder.DropForeignKey(
                name: "FK_ComparisonJsonDetail_Dosyalar_SecondFileId",
                table: "ComparisonJsonDetail");

            migrationBuilder.DropForeignKey(
                name: "FK_ComparisonJsonDetail_Icerikler_ContentId",
                table: "ComparisonJsonDetail");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ComparisonJsonDetail",
                table: "ComparisonJsonDetail");

            migrationBuilder.RenameTable(
                name: "ComparisonJsonDetail",
                newName: "ComparisonJsonDetails");

            migrationBuilder.RenameIndex(
                name: "IX_ComparisonJsonDetail_SecondFileId",
                table: "ComparisonJsonDetails",
                newName: "IX_ComparisonJsonDetails_SecondFileId");

            migrationBuilder.RenameIndex(
                name: "IX_ComparisonJsonDetail_FirstFileId",
                table: "ComparisonJsonDetails",
                newName: "IX_ComparisonJsonDetails_FirstFileId");

            migrationBuilder.RenameIndex(
                name: "IX_ComparisonJsonDetail_ContentId",
                table: "ComparisonJsonDetails",
                newName: "IX_ComparisonJsonDetails_ContentId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ComparisonJsonDetails",
                table: "ComparisonJsonDetails",
                column: "DetailId");

            migrationBuilder.AddForeignKey(
                name: "FK_ComparisonJsonDetails_Dosyalar_FirstFileId",
                table: "ComparisonJsonDetails",
                column: "FirstFileId",
                principalTable: "Dosyalar",
                principalColumn: "DosyaId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ComparisonJsonDetails_Dosyalar_SecondFileId",
                table: "ComparisonJsonDetails",
                column: "SecondFileId",
                principalTable: "Dosyalar",
                principalColumn: "DosyaId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ComparisonJsonDetails_Icerikler_ContentId",
                table: "ComparisonJsonDetails",
                column: "ContentId",
                principalTable: "Icerikler",
                principalColumn: "IcerikId",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ComparisonJsonDetails_Dosyalar_FirstFileId",
                table: "ComparisonJsonDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_ComparisonJsonDetails_Dosyalar_SecondFileId",
                table: "ComparisonJsonDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_ComparisonJsonDetails_Icerikler_ContentId",
                table: "ComparisonJsonDetails");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ComparisonJsonDetails",
                table: "ComparisonJsonDetails");

            migrationBuilder.RenameTable(
                name: "ComparisonJsonDetails",
                newName: "ComparisonJsonDetail");

            migrationBuilder.RenameIndex(
                name: "IX_ComparisonJsonDetails_SecondFileId",
                table: "ComparisonJsonDetail",
                newName: "IX_ComparisonJsonDetail_SecondFileId");

            migrationBuilder.RenameIndex(
                name: "IX_ComparisonJsonDetails_FirstFileId",
                table: "ComparisonJsonDetail",
                newName: "IX_ComparisonJsonDetail_FirstFileId");

            migrationBuilder.RenameIndex(
                name: "IX_ComparisonJsonDetails_ContentId",
                table: "ComparisonJsonDetail",
                newName: "IX_ComparisonJsonDetail_ContentId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ComparisonJsonDetail",
                table: "ComparisonJsonDetail",
                column: "DetailId");

            migrationBuilder.AddForeignKey(
                name: "FK_ComparisonJsonDetail_Dosyalar_FirstFileId",
                table: "ComparisonJsonDetail",
                column: "FirstFileId",
                principalTable: "Dosyalar",
                principalColumn: "DosyaId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ComparisonJsonDetail_Dosyalar_SecondFileId",
                table: "ComparisonJsonDetail",
                column: "SecondFileId",
                principalTable: "Dosyalar",
                principalColumn: "DosyaId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ComparisonJsonDetail_Icerikler_ContentId",
                table: "ComparisonJsonDetail",
                column: "ContentId",
                principalTable: "Icerikler",
                principalColumn: "IcerikId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
