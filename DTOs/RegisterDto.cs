using System.ComponentModel.DataAnnotations;

public class RegisterDto
{
    public string Username { get; set; } = string.Empty;
    public string? KnownAs { get; set; }
    public string? Gender { get; set; }
    public string? City { get; set; }
    public string? Country { get; set; }

    [StringLength(8, MinimumLength = 4)]
    public string Password { get; set; } = string.Empty;

    public string? Email { get; set; }
    public string? DisplayName { get; set; }

    public string DateOfBirth { get; set; } = string.Empty; // Keep as string
}
